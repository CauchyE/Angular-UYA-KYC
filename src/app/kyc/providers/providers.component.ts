import { Component } from '@angular/core';
import { config } from '../../models/config';
import { KycQueryClient } from '../../models/kyc/Kyc.client';
import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate';
import { ExecuteMsg } from 'src/app/models/kyc/Kyc.types';
import { KycApplicationService } from 'src/app/models/kyc/kyc.application.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css'],
})
export class ProvidersComponent {
  chainId = config.chainId;
  contractAddress = config.contractAddress;
  wasmClient$ = CosmWasmClient.connect(config.endpoint);
  client$ = this.wasmClient$.then(
    (client) => new KycQueryClient(client, config.contractAddress)
  );
  params$ = this.client$.then((client) => client.params());
  providers$ = this.client$.then((client) => client.providers());

  constructor(private readonly kycApp: KycApplicationService) {}

  async register(id: number) {
    await this.kycApp.createVerification(id);
  }
}
