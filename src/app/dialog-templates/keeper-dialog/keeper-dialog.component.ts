import { Component, OnInit, Inject } from '@angular/core';
import { IKeeper } from '@app/common/keeper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IKeeperDialogData {
  keeper: IKeeper;
}

@Component({
  selector: 'app-keeper-dialog',
  templateUrl: './keeper-dialog.component.html',
  styleUrls: ['./keeper-dialog.component.scss']
})
export class KeeperDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<KeeperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IKeeperDialogData
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
