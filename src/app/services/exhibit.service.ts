import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AreaService } from './area.service';
import { KeeperService } from './keeper.service';
import { IExhibit, Exhibit } from '@app/common/exhibit';

@Injectable()
export class ExhibitService {
  private exhibitSubject: BehaviorSubject<IExhibit[]>;
  exhibit$: Observable<IExhibit[]>;

  constructor(
    private areaService: AreaService,
    private keeperService: KeeperService
  ) {
    this.exhibitSubject = new BehaviorSubject<IExhibit[]>(
      exhibits.map((e: any) => {
        return new Exhibit({
          ...e,
          area: this.areaService.lookup(e.area),
          keeper: this.keeperService.lookup(e.keeper)
        });
      })
    );
    this.exhibit$ = this.exhibitSubject.asObservable();
  }


  lookup(target: string) {
    return this.exhibitSubject.value.find((c: IExhibit) => c.id === target);
  }

}

const exhibits = [
  {
    id: "blokino", name: 'Blokinos',
    area: "desert", keeper: '@rob',
    description: [
      "The aptly named blonkino is a known for its distinctive shape.  Aple to blend into desert discarded, "
        + "the blokino is a skilled hunter, capable of catching a baby emu in flight. These dully colored mammal-reptiles "
        + "make their nests in used Amazon shipping boxes and live their lives in small colonies of up to 100 individuals. As seen here, "
        + "blokinos are very family oriented and love to pose for photos.",
      "Location: blonkinos are found exclusively in the desert area around Baker, CA.",
      "Fun Fact: blonkinos are very social animals and will eat out of your hand, especially if you have tasty fingers."
    ]
  }
]
