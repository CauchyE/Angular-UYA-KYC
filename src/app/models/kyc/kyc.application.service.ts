import { Injectable } from '@angular/core';
import { config } from '../config';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { ExecuteMsg } from './Kyc.types';
import { Router } from '@angular/router';
import { LoadingDialogService } from '../loading-dialog';
import { FirebaseService } from '../firebase/firebase.service';

export interface VerificationData {
  contract_address: string;
  address: string;
  provider_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class KycApplicationService {
  chainId = config.chainId;
  contractAddress = config.contractAddress;
  constructor(
    private readonly router: Router,
    private readonly firebase: FirebaseService,
    private readonly loadingDialog: LoadingDialogService
  ) {}

  async txVerification(id: number) {
    if (!window.keplr) {
      alert('Please install keplr extension');
      return;
    }
    await window.keplr.enable(this.chainId);
    const key = await window.keplr.getKey(this.chainId);
    const address = key.bech32Address;

    const dialogRef = this.loadingDialog.open('Sending...');
    try {
      const offlineSigner = window.keplr.getOfflineSigner(this.chainId);
      const signingClient = await SigningCosmWasmClient.connectWithSigner(
        config.endpoint,
        offlineSigner
        //  { gasPrice: GasPrice.fromString('0.025uguu') }
      );
      const msg: ExecuteMsg = {
        create_verification: { customer: address, provider_id: id },
      };
      const result = await signingClient.execute(
        address,
        this.contractAddress,
        msg,
        {
          amount: [],
          gas: '250000',
        }
      );
      console.log(result);
    } catch (e) {
      alert(`An error has occur: ${(e as Error).toString()}`);
      console.log(e);
      return;
    } finally {
      dialogRef.close();
    }

    await this.router.navigate(['addresses', address]);
  }

  async createVerification(id: number) {
    if (!window.keplr) {
      alert('Please install keplr extension');
      return;
    }
    await window.keplr.enable(this.chainId);
    const key = await window.keplr.getKey(this.chainId);
    const address = key.bech32Address;

    const dialogRef = this.loadingDialog.open('Waiting...');
    await this.firebase.addVerification({
      contract_address: this.contractAddress,
      address: address,
      provider_id: id,
    });

    dialogRef.close();
  }
}
