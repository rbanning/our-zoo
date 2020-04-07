import { Injectable } from '@angular/core';
import { IConfig } from '@app/common/config';
import { environment } from "@root/environments/environment";

@Injectable()
export class ConfigService {
  private _config: IConfig;

  constructor() {
    this._config = {...environment};
  }

  keys(): string[] {
    return Object.keys(this._config);
  }

  hasKey(key: string): boolean {
    return key in this._config;
  }

  get(key: string): string {
    if (this.hasKey(key)) { return this._config[key]; }
    //else
    return null;
  }

  getAll(): IConfig {
    return {...this._config};
  }
}
