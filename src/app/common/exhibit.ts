import { IKeeper, Keeper } from './keeper';
import { IArea, Area } from './area';
import * as utils from './utilities';


export interface IExhibit {
  id: string;
  name: string;
  description: string[];
  area: IArea;
  keeper: IKeeper;
  readonly imagePath: string;
  readonly thumbPath: string;
}

export class Exhibit implements IExhibit {
  id: string;
  name: string;
  description: string[];
  area: IArea;
  keeper: IKeeper;
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
      this.description = Array.isArray(obj.description) ?
            obj.description :
            obj.description.toString().split('/n');
      this.area = obj.area ? new Area(obj.area) : null;
      this.keeper = obj.keeper ? new Keeper(obj.keeper) : null;
    }
  }
}
