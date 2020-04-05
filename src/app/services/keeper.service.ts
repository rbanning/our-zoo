import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IKeeper, Keeper, AVATARS, avatarLookup } from '@app/common/keeper';
import * as utils from '@app/common/utilities';

const keeperRepo: IKeeper[] = [
  new Keeper(
    {
      id: "@ruby", name: "Ruby",
      avatar: avatarLookup("tiffany"),
      bio: null
    }
  )
];

class Repo {
  private _repo: IKeeper[];

  constructor() {
    this._repo = keeperRepo.map(k => {
      return new Keeper({...k, bio: k.bio || this.buildBio(k.name)});
    })
  }

  create(count: number = null): IKeeper[] {
    count = count || this.names.length;

    const ret:IKeeper[] = [...this._repo];
    let name: string;

    for (let index = 0; index < count && ret.length < count; index++) {
      if (!ret.some(k => k.avatar === AVATARS[index])) {
        name = utils.capitalize(this.names[index]);
        ret.push(new Keeper({
          id: `@${this.names[index]}`,
          name,
          bio: this.buildBio(name),
          avatar: AVATARS[index]
        }));
      }
    }

    return ret;
  }


  private buildBio(name: string): string {
    const year = 2000 + ((Math.random() * 10) | 0);
    const time = 2 + ((Math.random() * 4) | 0);
    const animals = utils.randomElement(this.animals);
    const city = utils.randomElement(this.cities);
    const special = utils.randomElement(this.specialities);
    const template = utils.randomElement(this.bioTemplates);
    const rx = (text:string) => { return new RegExp(`\{${text}\}`, 'g'); }

    return template
            .replace(rx('name'), name)
            .replace(rx('year'), year)
            .replace(rx('time'), time)
            .replace(rx('animals'), animals)
            .replace(rx('city'), city)
            .replace(rx('special'), special);
  }

  private bioTemplates = [
    "{name} join the Zoo in {year} after serving {time} years working for the famous City of {city} Zoo. Specializing in {special}, {name} brings a wealth of experience and talent to the Zoo.",
    "{name} worked previously at {city} Zoo where she focused on {special}.  In {year}, {name} join us after taking {time} months to volunteer helping lost {animals}.",
    "{name} is renowned for knowledge in {special} and has been a valuable member of the Zoo since {year}.  Previously working at the Zoo of {city}, {name} was responsible for caring for the {animals}."
  ];
  private names = [
    "abby",
    "alice",
    "arnold",
    "arthur",
    "betty",
    "bonnie",
    "bridget",
    "clyde",
    "felix",
    "franklin",
    "lizabeth",
    "midge",
    "mr-incredible",
    "pheona",
    "randy",
    "ruth",
    "skippy",
    "tiffany",
    "tommy",
    "tucker"
  ];

  private animals = ["penguins", "meerkats", "dolphins", "goldfish", "ants", "elephants", "pigs", "kittens"];
  private cities = ["London", "New York", "Chicago", "Bakersfield", "Stockton", "Davis", "Boston", "Vienna", "Hong Kong", "Carson", "Reno"];
  private specialities = ["Scat Analysis", "Ear Wax Sculpting", "Hair/Fur Styling", "Paw Counting"];
}

@Injectable()
export class KeeperService {
  private keeperSubject: BehaviorSubject<IKeeper[]>;
  keepers$: Observable<IKeeper[]>;

  constructor() {
    const repo = new Repo();
    this.keeperSubject = new BehaviorSubject<IKeeper[]>(repo.create());
    this.keepers$ = this.keeperSubject.asObservable();
  }
}


