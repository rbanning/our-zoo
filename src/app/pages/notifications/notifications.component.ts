import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '@app/services';
import { Observable } from 'rxjs';
import { INotification } from '@app/common/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications$: Observable<INotification[]>;

  constructor(
    private service: NotificationsService
  ) {
    this.notifications$ = this.service.notifications$;
  }

  ngOnInit(): void {
  }

}
