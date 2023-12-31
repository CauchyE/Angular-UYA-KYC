import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KycComponent } from './kyc.component';
import { ProvidersComponent } from './providers/providers.component';
import { ProviderComponent } from './providers/provider/provider.component';
import { AddressComponent } from './addresses/address/address.component';
import { RegisterComponent } from './providers/provider/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: KycComponent,
  },
  {
    path: 'providers',
    component: ProvidersComponent,
  },
  {
    path: 'providers/:provider_id',
    component: ProviderComponent,
  },
  {
    path: 'providers/:provider_id/register',
    component: RegisterComponent,
  },
  {
    path: 'addresses/:address',
    component: AddressComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KycRoutingModule {}
