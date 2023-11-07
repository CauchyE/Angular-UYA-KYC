import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FunctionsService } from 'src/app/models/firebase/functions.service';
import { KycApplicationService } from 'src/app/models/kyc/kyc.application.service';
import { Window as KeplrWindow } from '@keplr-wallet/types';
import { LoadingDialogService } from 'src/app/models/loading-dialog';
import { Dialog } from '@angular/cdk/dialog';
import { TxConfirmDialogComponent } from 'src/app/models/txs/tx-confirm/tx-confirm-dialog.component';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  providerId$?: Observable<string>;

  complyCube: any = {};
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;

  constructor(
    private route: ActivatedRoute,
    private readonly kycApp: KycApplicationService,
    private readonly functionsService: FunctionsService,
    private readonly router: Router,
    private readonly dialog: Dialog,
    private readonly loadingDialog: LoadingDialogService
  ) {
    this.providerId$ = this.route.params.pipe(
      map((params) => params['provider_id'])
    );
  }

  async connectWallet() {
    const key = await this.kycApp.suggestChainAndGetKey();
    if (!key) {
      alert('Invalid key');
      return;
    }
    this.address = key.bech32Address;
  }

  async startVerification(id: string) {
    // const email = auth.currentUser?.email || '';
    if (!this.firstName || !this.lastName || !this.email) {
      alert('Please fill out the form');
      return;
    }
    if (!this.address) {
      alert('Please connect wallet');
      return;
    }
    const registerAddress = this.address;
    const loading = this.loadingDialog.open('Loading...');
    const result = await this.functionsService.getKycToken(
      this.firstName,
      this.lastName,
      this.email
    );
    loading.close();
    const token = result.data;
    this.complyCube = await (window as any).ComplyCube.mount({
      token,
      containerId: 'complycube-mount',
      stages: [
        'intro',
        'documentCapture', // address
        'poaCapture', // identification
        'completion',
      ],
      onComplete: async (data: any) => {
        console.log('Capture complete', data);
        const idNum = parseInt(id);
        await this.sleep(100); // wait 0.1 sec
        const sending = this.loadingDialog.open('Sending transaction...');
        const txHash = await this.kycApp.txVerification(idNum, registerAddress);
        sending.close();
        if (!txHash) {
          alert('Invalid tx hash');
          return;
        }
        const saving = this.loadingDialog.open('Saving...');
        await this.kycApp.createVerification(registerAddress, idNum, txHash);
        await this.sleep(6000); // wait 6 sec
        saving.close();
        this.complyCube.updateSettings({ isModalOpen: false });
        console.log('txHash: ', txHash);

        await this.router.navigate(['addresses', registerAddress]);
      },
      onError: (e: any) => {
        console.error(e);
      },
    });
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
