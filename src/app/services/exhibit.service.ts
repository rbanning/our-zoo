import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AreaService } from './area.service';
import { IExhibit } from '@app/common/exhibit';

@Injectable()
export class ExhibitService {
  private exhibitSubject: BehaviorSubject<IExhibit[]>;
  exhibit$: Observable<IExhibit[]>;

  constructor(
    private areaService: AreaService
  ) { }
}

const exhibits = [
  { name: ''}
]
