import { Component } from '@angular/core';
import { config } from '../../../models/config';
import { KycQueryClient } from '../../../models/kyc/Kyc.client';
import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate';
import { ActivatedRoute } from '@angular/router';
import { ExecuteMsg, Provider } from 'src/app/models/kyc/Kyc.types';
import { Observable, combineLatest, from, map } from 'rxjs';
import { Window as KeplrWindow } from '@keplr-wallet/types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
})
export class ProviderComponent {
  chainId = config.chainId;
  contractAddress = config.contractAddress;
  endpoint = config.endpoint;
  wasmClient$ = CosmWasmClient.connect(this.endpoint);
  client$ = this.wasmClient$.then(
    (client) => new KycQueryClient(client, this.contractAddress)
  );
  providers$ = this.client$.then((client) => client.providers());
  providerId$?: Observable<number>;
  provider$?: Observable<Provider>;

  constructor(private route: ActivatedRoute) {
    this.providerId$ = this.route.params.pipe(
      map((params) => params['provider_id'])
    );
    this.provider$ = combineLatest([
      from(this.providers$),
      this.providerId$,
    ]).pipe(map(([providers, providerId]) => providers[providerId]));
  }

  async register(id: number) {
    if (!window.keplr) {
      alert('Please install keplr extension');
      return;
    }
    await window.keplr.enable(this.chainId);
    if (window.getOfflineSigner) {
    }
    const key = await window.keplr.getKey(this.chainId);
    const address = key.bech32Address;
    const offlineSigner = window.keplr.getOfflineSigner(this.chainId);
    const signingClient = await SigningCosmWasmClient.connectWithSigner(
      config.endpoint,
      offlineSigner
    );
    const msg: ExecuteMsg = {
      create_verification: { customer: address, provider_id: id },
    };
    const result = signingClient.execute(
      address,
      this.contractAddress,
      msg,
      'auto'
    );
    console.log(result);
  }
}
