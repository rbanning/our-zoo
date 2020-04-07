import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IKeeper } from '@app/common/keeper';
import { KeeperDialogComponent } from '@app/dialog-templates/keeper-dialog/keeper-dialog.component';

@Component({
  selector: 'app-keeper-badge',
  templateUrl: './keeper-badge.component.html',
  styleUrls: ['./keeper-badge.component.scss']
})
export class KeeperBadgeComponent implements OnInit {
  @Input()
  keeper: IKeeper;

  @Input()
  size: number = 60;

  @HostBinding("style.width") width: string;
  @HostBinding("style.height") height: string;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.width = `${this.size}px`;
    this.height = this.width;
  }

  viewMore() {
    const dialogRef = this.dialog.open(KeeperDialogComponent, {
      width: '400px',
      data: { keeper: this.keeper }
    });
  }

}
