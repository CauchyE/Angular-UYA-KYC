import { Component } from '@angular/core';
import { config } from '../../../models/config';
import { KycQueryClient } from '../../../models/kyc/Kyc.client';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { ActivatedRoute } from '@angular/router';
import { Provider } from 'src/app/models/kyc/Kyc.types';
import { Observable, combineLatest, from, map } from 'rxjs';
import { Window as KeplrWindow } from '@keplr-wallet/types';
import { KycApplicationService } from 'src/app/models/kyc/kyc.application.service';
import { FunctionsService } from 'src/app/models/firebase/functions.service';

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
  complyCube = {};
  firstName = '';
  lastName = '';
  email = '';

  constructor(
    private route: ActivatedRoute,
    private readonly kycApp: KycApplicationService,
    private readonly functionsService: FunctionsService
  ) {
    this.providerId$ = this.route.params.pipe(
      map((params) => params['provider_id'])
    );
    this.provider$ = combineLatest([
      from(this.providers$),
      this.providerId$,
    ]).pipe(map(([providers, providerId]) => providers[providerId]));
  }

  async register(id: number) {
    await this.kycApp.createVerification(id);
  }

  async startVerification() {
    try {
      // const email = auth.currentUser?.email || '';
      const result = await this.functionsService.getKycToken(
        this.firstName,
        this.lastName,
        this.email
      );
      const token = result.data;

      this.complyCube = (window as any).ComplyCube.mount({
        token,
        containerId: 'complycube-mount',
        stages: ['intro', 'poaCapture', 'documentCapture', 'completion'],
        onComplete: this.onComplete,
        onError: (e: any) => {
          console.error(e);
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      (window as any).ComplyCube.unmount();
      // processing = false;
    }
  }

  onComplete(data: any) {
    console.log('Capture complete', data);
    // location.href = '/';
  }
}
