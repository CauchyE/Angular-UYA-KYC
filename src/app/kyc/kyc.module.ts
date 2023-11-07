import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KycRoutingModule } from './kyc-routing.module';
import { KycComponent } from './kyc.component';
import { ProvidersComponent } from './providers/providers.component';
import { ProviderComponent } from './providers/provider/provider.component';
import { AddressComponent } from './addresses/address/address.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './providers/provider/register/register.component';

@NgModule({
  declarations: [
    KycComponent,
    ProvidersComponent,
    ProviderComponent,
    AddressComponent,
    RegisterComponent,
  ],
  imports: [CommonModule, KycRoutingModule, FormsModule],
})
export class KycModule {}
