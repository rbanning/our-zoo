import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as moment from 'moment';

import { ConfigService } from './config.service';
import { IConfig } from '@app/common/config';

@Injectable()
export class ContactService {
  config: IConfig;

  constructor(
    private http: HttpClient,
    configService: ConfigService
  ) { 
    this.config = configService.getAll();
    if (!this.config.trelloUrl) { throw new Error("ContactService is missing Trello url."); }
    if (!this.config.trelloApi) { throw new Error("ContactService is missing Trello api key."); }
    if (!this.config.trelloToken) { throw new Error("ContactService is missing Trello token."); }
    if (!this.config.trelloBoardId) { throw new Error("ContactService is missing Trello board id."); }
    if (!this.config.trelloListId) { throw new Error("ContactService is missing Trello list id."); }
  }

  send(name: string, email: string, message: string): Observable<any> {
    const url = this.buildUrl('cards');
    const data = {
      idList: this.config.trelloListId,
      name: `${name} - [${this.config.appName}]`,
      desc: `
### Posted Message
**From: ** ${name} [${email}],
**Via: ** APP - ${this.config.appName} on ${this.config.platform}
**Date: ** ${moment().format('MMMM D YYYY, h:mm a Z')}

---

${message}`,
      pos: 'top',
      due: moment().add(1, 'day').format()
    };

    return this.http.post(url, data);
  }


  private buildUrl(path: string) {
    return `${this.config.trelloUrl}${path}?key=${this.config.trelloApi}&token=${this.config.trelloToken}`;
  }
}
