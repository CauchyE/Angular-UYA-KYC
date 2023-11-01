import { Component } from '@angular/core';
import { config } from '../../models/config';
import { KycQueryClient } from '../../models/kyc/Kyc.client';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css'],
})
export class ProvidersComponent {
  wasmClient$ = CosmWasmClient.connect(config.endpoint);
  client$ = this.wasmClient$.then(
    (client) => new KycQueryClient(client, config.contractAddress)
  );
  params$ = this.client$.then((client) => client.params());
  providers$ = this.client$.then((client) => client.providers());
}
