import { LoadingDialogComponent } from './loading-dialog.component';
import { Dialog } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingDialogService {
  constructor(private overlay: Overlay, private dialog: Dialog) {}

  open(message: string) {
    const message$ = new BehaviorSubject<string>(message);

    const dialogRef = this.dialog.open(LoadingDialogComponent, {
      minWidth: '300px',
      data: { message$ },
      disableClose: true,
    });

    return {
      next: (message: string) => message$.next(message),
      close: () => {
        dialogRef.close();
        message$.complete();
      },
    };
  }
}
