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
    created: "2020-04-02",
    description: {
      summary: "The aptly named blonkino is a known for its distinctive shape.  Aple to blend into desert discarded, "
        + "the blokino is a skilled hunter, capable of catching a baby emu in flight. These dully colored mammal-reptiles "
        + "make their nests in used Amazon shipping boxes and live their lives in small colonies of up to 100 individuals. As seen here, "
        + "blokinos are very family oriented and love to pose for photos.",
      location: "Blonkinos are found exclusively in the desert area around Baker, CA.  However, you may be able to find one in your back yard.",
      fact: "Blonkinos are very social animals and will eat out of your hand, especially if you have tasty fingers.",
      status: "Blonkinos are on the endangered animal list and need your help to protect them."
    }
  },
  {
    id: "rock-dachs", name: 'Rock Dachs',
    area: "rainy-forest", keeper: '@rob',
    created: "2020-04-04",
    description: {
      summary: "Similar in shape to his near cousin, the dachshund dog, the Rock Dachs has a long body, short legs, and a cute face."
        + "But where they differ is in how the Rock Dachs has adapted to the rugged landscape they call home.  Rock Dachs have paws "
        + "that are as tough as stone and aid in their ability to catch food.",
      food: "Rock Dachs love to eat small animals and sometimes tasty berries.  Before they eat their meal, they mush it by stomping on the food with their paws.",
      location: "Rock Dachs are found almost every continent but where they thrive is in the lush forests of Brazil.",
      fact: "Rock Dachs are very shy and will hide whenever any animal approaches.  In fact, they will often hide from their pry.  It will take them a few minutes to realize that the animal is not a threat but a meal.",
      status: "Since Rock Dachs are so shy, we do not have an accurate count of how many exist in the wild."
    }
  },
  {
    id: "pop-penguin", name: 'Popping Penguins',
    area: "arctic-circle", keeper: '@ruby',
    created: "2020-04-07",
    description: {
      summary: "Similar to those of Mr. Popper's, Popping Penguins have little puff-balls on their heads. "
        + "They are call popping peguins because they live in little burrows and pop-up their heads up to say 'Hello' whenever something goes by. "
        + "Popping Penguins are very friendly creatures and love to give high-flippers.",
      food: "Popping Peguins love all types of sushi except for the spicy ones.  They don't do spicy.",
      location: "Rocky beaches in the Antarctic.",
      fact: "Popping Penguins can jump up to three feet high - even higher if they get a whiff of a California Roll.",
      status: "Endangered - everyone loves peguins but only Mr. Popper can have them as pets. You are not qualified!"
    }
  },
]
