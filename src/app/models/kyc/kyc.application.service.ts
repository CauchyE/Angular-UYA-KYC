import { Injectable } from '@angular/core';
import { config } from '../config';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { ExecuteMsg } from './Kyc.types';
import { Router } from '@angular/router';
import { LoadingDialogService } from '../loading-dialog';
import { FirebaseService } from '../firebase/firebase.service';
import { Key } from '@keplr-wallet/types';
import { FunctionsService } from '../firebase/functions.service';

export interface VerificationData {
  contract_address: string;
  address: string;
  provider_id: number;
  tx_hash: string;
}

@Injectable({
  providedIn: 'root',
})
export class KycApplicationService {
  chainId = config.chainId;
  contractAddress = config.contractAddress;
  constructor(
    private readonly firebase: FirebaseService,
    private readonly functions: FunctionsService,
    private readonly loadingDialog: LoadingDialogService
  ) {}

  async createVerification(address: string, id: number, txHash: string) {
    await this.firebase.addVerification({
      address: address,
      contract_address: this.contractAddress,
      provider_id: id,
      tx_hash: txHash,
    });
  }

  async txVerification(
    id: number,
    address: string
  ): Promise<string | undefined> {
    console.log('register: ', address, id, this.contractAddress);
    const txHash = await this.functions.txVerification(
      address,
      id,
      this.contractAddress,
      config.endpoint
    );
    return txHash.data;
  }

  private async getKey(): Promise<Key | undefined> {
    if (!window.keplr) {
      // alert('Please install Keplr extension');
      return;
    }
    const chainID = this.chainId;
    await window.keplr.enable(chainID);

    const key = await window.keplr.getKey(chainID);
    return key;
  }

  private async suggestChain(): Promise<void> {
    if (!window.keplr) {
      alert('Please install Keplr extension');
      return;
    }
    const chainId = this.chainId;
    const chainName = config.chainName;
    const rpc = config.endpoint;
    const rest = config.rest;
    const bip44 = { coinType: 118 };
    const bech32Config = {
      bech32PrefixAccAddr: config.bech32Prefix.accAddr,
      bech32PrefixAccPub: config.bech32Prefix.accPub,
      bech32PrefixValAddr: config.bech32Prefix.valAddr,
      bech32PrefixValPub: config.bech32Prefix.valPub,
      bech32PrefixConsAddr: config.bech32Prefix.consAddr,
      bech32PrefixConsPub: config.bech32Prefix.consPub,
    };
    const currencies = [
      {
        coinDenom: 'GUU',
        coinMinimalDenom: 'uguu',
        coinDecimals: 6,
        coinGeckoId: 'ununifi',
      },
    ];
    const feeCurrencies = [
      {
        coinDenom: 'GUU',
        coinMinimalDenom: 'uguu',
        coinDecimals: 6,
        coinGeckoId: 'ununifi',
      },
    ];
    const stakeCurrency = {
      coinDenom: 'GUU',
      coinMinimalDenom: 'uguu',
      coinDecimals: 6,
      coinGeckoId: 'ununifi',
    };
    const gasPriceStep = {
      low: 0,
      average: 0.01,
      high: 0.03,
    };
    const chainInfo = {
      chainId,
      chainName,
      rpc,
      rest,
      bip44,
      bech32Config,
      currencies,
      feeCurrencies,
      stakeCurrency,
      gasPriceStep,
    };
    await window.keplr.experimentalSuggestChain(chainInfo);
  }

  async suggestChainAndGetKey(): Promise<Key | undefined> {
    const dialogRefSuggestChainAndGetKey = this.loadingDialog.open(
      'connecting to Keplr...'
    );
    try {
      await this.suggestChain();
    } catch (error) {
      console.error(error);
      const errorMessage = `Keplr Connection failed: ${(
        error as Error
      ).toString()}`;
      alert(`An error has occur: ${errorMessage}`);
      dialogRefSuggestChainAndGetKey.close();
      return;
    }
    let keyData: Key | undefined;
    try {
      keyData = await this.getKey();
    } catch (error) {
      console.error(error);
      const errorMessage = `Keplr Connection failed: ${(
        error as Error
      ).toString()}`;
      alert(`An error has occur: ${errorMessage}`);
    } finally {
      dialogRefSuggestChainAndGetKey.close();
    }
    return keyData;
  }
}
