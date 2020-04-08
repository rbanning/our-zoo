import * as moment from 'moment';

import { IKeeper, Keeper } from './keeper';
import { IArea, Area } from './area';
import * as utils from './utilities';
import { INotification, Notification } from './notification';

export interface IExhibitDescription {
  summary: string;
  location?: string;
  food?: string;
  status?: string;
  fact?: string;
}

export interface IExhibit {
  id: string;
  name: string;
  description: IExhibitDescription;
  area: IArea;
  keeper: IKeeper;
  created: moment.Moment;
  readonly imagePath: string;
  readonly thumbPath: string;

  toNotification(): INotification
}

export class Exhibit implements IExhibit {
  id: string;
  name: string;
  description: IExhibitDescription;
  area: IArea;
  keeper: IKeeper;
  created: moment.Moment;
  get imagePath() {
    return `/assets/exhibits/${this.id}.jpg`;
  }
  get thumbPath() {
    return `/assets/exhibits/${this.id}-thumb.jpg`;
  }

  constructor(obj: any = null) {
    if (obj) {
      this.id = obj.id || utils.replaceSpace(obj.name, '-').toLocaleLowerCase();
      this.name = obj.name;
      this.description = typeof obj.description === 'string' ?
        { summary: obj.description } : obj.description;
      this.area = obj.area ? new Area(obj.area) : null;
      this.keeper = obj.keeper ? new Keeper(obj.keeper) : null;
      this.created = moment(obj.created);
    }
  }

  toNotification(): INotification {
    return new Notification({
      id: this.id,
      type: 'normal',
      date: this.created,
      heading: 'New Exhibit',
      message: `We have a new exhibit, '${this.name}', in our ${this.area.name} habitat thanks to our world renowned keeper, ${this.keeper.name}. `,
      route: [`/areas/${this.area.id}`, this.id],
      routeLabel: 'visit the exhibit...'
    });
  }
}
