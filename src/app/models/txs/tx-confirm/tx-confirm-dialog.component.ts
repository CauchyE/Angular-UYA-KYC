import { Clipboard } from '@angular/cdk/clipboard';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';

export interface TxConfirmDialogData {
  txHash: string;
  msg: string;
}
@Component({
  selector: 'view-tx-confirm-dialog',
  templateUrl: './tx-confirm-dialog.component.html',
  styleUrls: ['./tx-confirm-dialog.component.css'],
})
export class TxConfirmDialogComponent implements OnInit {
  txData?: TxConfirmDialogData;
  constructor(
    @Inject(DIALOG_DATA)
    public readonly data: TxConfirmDialogData,
    private readonly dialogRef: DialogRef<TxConfirmDialogComponent>,
    private clipboard: Clipboard
  ) {
    data.msg = data.msg;
  }

  ngOnInit(): void {}

  onClickClose() {
    this.dialogRef.close();
  }

  onClickOpenTxDetail() {
    window.open(
      'https://ununifi.io' + '/portal/utilities/txs/' + this.data.txHash,
      '_blank'
    );
  }

  copyClipboard(value: string) {
    if (value.length > 0) {
      this.clipboard.copy(value);
    }
    return false;
  }
}
