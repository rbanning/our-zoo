import * as moment from 'moment';
import { GUID } from './guid';

export type NotificationType = 'normal' | 'urgent';

export interface INotification {
  id: string;
  type: NotificationType;
  heading: string;
  message: string;
  date: moment.Moment;
  route?: string[],
  routeLabel?: string;
}

export class Notification implements INotification {
  id: string;
  type: NotificationType;
  heading: string;
  message: string;
  date: moment.Moment;
  route: string[];
  routeLabel?: string;

  constructor(obj: any = null) {
    this.id = GUID.create().toSimpleString();
    this.type = 'normal';
    this.date = moment();

    if (obj) {
      this.id = obj.id || this.id;
      this.type = obj.type || this.type;
      this.heading = obj.heading || (this.type !== 'normal' ? this.type : '');
      this.date = moment(obj.date);
      this.message = obj.message;
      this.route = obj.route;
      this.routeLabel = obj.routeLabel;
    }
  }
}
