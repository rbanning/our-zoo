import { IKeeper, Keeper } from './keeper';
import { GUID } from './guid';
import { IArea, Area } from './area';



export interface IExhibit {
  id: string;
  name: string;
  description: string[];
  area: IArea;
  keeper: IKeeper
  readonly imagePath: string;
}

export class Exhibit {
  id: string;
  name: string;
  description: string[];
  area: IArea;
  keeper: IKeeper;

  constructor(obj: any = null) {
    this.id = GUID.create().toSimpleString();
    this.keeper = null;

    if (obj) {
      this.id = obj.id || this.id;
      this.name = obj.name;
      this.description = Array.isArray(obj.description) ?
            obj.description :
            obj.description.toString().split('/n');
      this.area = obj.area ? new Area(obj.area) : null;
      this.keeper = obj.keeper ? new Keeper(obj.keeper) : null;
    }
  }
}
