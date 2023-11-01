import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KycRoutingModule } from './kyc-routing.module';
import { KycComponent } from './kyc.component';
import { ProvidersComponent } from './providers/providers.component';
import { ProviderComponent } from './providers/provider/provider.component';
import { AddressComponent } from './addresses/address/address.component';


@NgModule({
  declarations: [
    KycComponent,
    ProvidersComponent,
    ProviderComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    KycRoutingModule
  ]
})
export class KycModule { }
