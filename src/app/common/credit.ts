import * as utils from './utilities';

export interface ICredit {
  id: string;
  name: string;
  thumb: string;
  readonly url: string;
}

export class Credit implements ICredit {
  id: string;
  name: string;
  thumb: string;
  get url() {
    return Credit.URL_TEMPLATE.replace('{id}', this.id);
  }

  constructor(obj: any = null) {
    if (obj) {
      this.id = obj.id || Credit.generateId(obj.name);
      if (this.id.indexOf('@') !== 0) {
        this.id = `@${obj.id}`;
      }
      this.name = obj.name;
      this.thumb = Credit.parseThumb(obj.thumb, this.name);
    }
  }

  private static THUMB_PATH = '/assets/credits/';
  private static URL_TEMPLATE = 'https://unsplash.com/{id}';

  public static parseThumb(path: string, name: string) {
    if (path || name) {
      path = path || `${utils.replaceSpace(name, '-').toLocaleLowerCase()}.jpg`;
      if (path.indexOf(this.THUMB_PATH) < 0) {
        path = this.THUMB_PATH + path;
      }
    }

    return path;
  }

  public static generateId(name: string) {
    return `@${utils.replaceSpace(name, '').toLocaleLowerCase()}`;
  }
}
