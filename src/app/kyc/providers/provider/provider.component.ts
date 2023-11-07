import { Component } from '@angular/core';
import { config } from '../../../models/config';
import { KycQueryClient } from '../../../models/kyc/Kyc.client';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { ActivatedRoute } from '@angular/router';
import { Provider } from 'src/app/models/kyc/Kyc.types';
import { Observable, combineLatest, from, map } from 'rxjs';
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
}
