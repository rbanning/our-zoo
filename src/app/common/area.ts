import * as utils from './utilities';
import { ICredit, Credit } from './credit';

export interface IArea {
  id: string;
  name: string;
  description: string;
  thumb: string;
  credit: ICredit;
  color: string;
  tagline: string;
}

export class Area implements IArea {
  id: string;
  name: string;
  description: string;
  thumb: string;
  credit: ICredit;
  color: string;
  tagline: string;

  constructor(obj: any = null) {
    if (obj) {
      this.id = obj.id || utils.replaceSpace(obj.name, '-').toLocaleLowerCase();
      this.name = obj.name;
      this.description = obj.description || "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum perferendis hic illo nesciunt? Doloribus eos, quas expedita sint distinctio cum ad inventore quod non. Hic sed amet accusamus commodi ipsum?";
      this.thumb = Area.parseThumbPath(obj.thumb, this.id);
      this.credit = obj.credit ? new Credit(obj.credit) : null;
      this.color = obj.color;
      this.tagline = obj.tagline;
    }
  }

  private static THUMB_PATH = '/assets/areas/';

  public static parseThumbPath(thumb: string, id: string): string {
    if (thumb || id) {
      thumb = thumb || `${id}.jpg`;
      if (thumb.indexOf(this.THUMB_PATH) < 0) {
        thumb = this.THUMB_PATH + thumb;
      }
      return thumb;
    }

    //else
    return null;
  }

}
