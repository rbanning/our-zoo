import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { INotification } from '@app/common/notification';
import * as moment from 'moment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit {
  @Input()
  notification: INotification;

  get date() {
    if (moment.isMoment(this.notification.date)) {
      return this.notification.date.fromNow();
    } else {
      return null;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
