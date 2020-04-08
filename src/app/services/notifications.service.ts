import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { INotification, Notification } from '@app/common/notification';
import { ExhibitService } from './exhibit.service';
import { IExhibit } from '@app/common/exhibit';

@Injectable()
export class NotificationsService {
  notifications$: Observable<INotification[]>;

  constructor(
    exhibitService: ExhibitService
  ) {
    this.notifications$ = exhibitService.exhibit$
      .pipe(
        map((exhibits: IExhibit[]) => {
          const repo = [...exhibits.map(e => e.toNotification()), ..._repo];
          repo.sort(this.compare);
          return repo;
        })
      )
   }

  private compare(a: INotification, b: INotification): number {
    return b.date.diff(a.date);
  }
}

const _repo = [
  new Notification({
    date: '2020-04-01',
    heading: 'Welcome',
    message: 'Welcome to the launch of Our Zoo, a fun project where we curate '
      + 'a group of some of the strangest animals you will ever see in a zoo.'
  })
]
