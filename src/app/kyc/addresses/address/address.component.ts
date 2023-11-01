import { Component } from '@angular/core';
import { config } from '../../../models/config';
import { KycQueryClient } from '../../../models/kyc/Kyc.client';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, from, map, mergeMap } from 'rxjs';
import { InformationRequest, Verification } from 'src/app/models/kyc/Kyc.types';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent {
  wasmClient$ = CosmWasmClient.connect(config.endpoint);
  client$ = this.wasmClient$.then(
    (client) => new KycQueryClient(client, config.contractAddress)
  );
  address$?: Observable<string>;
  verifications$?: Observable<Verification[]>;
  informationRequests$?: Observable<InformationRequest[]>;

  constructor(private route: ActivatedRoute) {
    this.address$ = this.route.params.pipe(map((params) => params['address']));
    this.verifications$ = combineLatest([
      from(this.client$),
      this.address$,
    ]).pipe(mergeMap(([client, address]) => client.verifications({ address })));
    this.informationRequests$ = combineLatest([
      from(this.client$),
      this.address$,
    ]).pipe(
      mergeMap(([client, address]) => client.informationRequests({ address }))
    );
  }
}
