import { GUID } from './guid';

export interface IArea {
  id: string;
  name: string;
  description: string;
  thumb: string;
}

export class Area implements IArea {
  id: string;
  name: string;
  description: string;
  thumb: string;

  constructor(obj: any = null) {
    this.id = GUID.create().toSimpleString();

    if (obj) {
      this.id = obj.id || this.id;
      this.name = obj.name;
      this.description = obj.description;
      this.thumb = Area.parseThumbPath(obj.thumb);
    }
  }

  public static parseThumbPath(thumb: string): string {
    if (thumb) {
      if (thumb.indexOf('/assets/areas/') < 0) {
        thumb = `/assets/areas/${thumb}`;
      }
      return thumb;
    }

    //else
    return null;
  }
}
