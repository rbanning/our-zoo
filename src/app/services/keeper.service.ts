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
  ),
  new Keeper(
    {
      id: "@rob", name: "Rob",
      avatar: avatarLookup("franklin"),
      bio: null
    }
  ),
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
    const occupation = utils.randomElement(this.occupations);
    const special = utils.randomElement(this.specialities);
    const template = utils.randomElement(this.bioTemplates);
    const rx = (text:string) => { return new RegExp(`\{${text}\}`, 'g'); }

    return template
            .replace(rx('name'), name)
            .replace(rx('year'), year)
            .replace(rx('time'), time)
            .replace(rx('animals'), animals)
            .replace(rx('city'), city)
            .replace(rx('occupation'), occupation)
            .replace(rx('special'), special);
  }

  private bioTemplates = [
    "{name} join the Zoo in {year} after serving {time} years working for the famous City of {city} Zoo. Specializing in {special}, {name} brings a wealth of experience and talent to the Zoo.",
    "{name} worked previously at {city} Zoo where she focused on {special}.  In {year}, {name} join us after taking {time} months to volunteer helping lost {animals}.",
    "{name} is renowned for knowledge in {special} and has been a valuable member of the Zoo since {year}.  Previously working at the Zoo of {city}, {name} was responsible for caring for the {animals}.",
    "{name} is new to the Zoo.  Since {year}, {name} has been working for the City of {city} as a {occupation} and attending night school in the area of {special}. We welcome {name} as member of our staff, caring for the {animals}.",
    "{name} is a world renowned zoologist specializing in {special}.  Born in {city}, {name} spent the early years as a {occupation} which was great preparation for work at the Zoo. While only joining our staff {time} months ago, {name} is already a favorite of the {animals}.",
    "{name} join the Zoo in {year} as part of our outreach program targeting {occupation}s in {city}.  While not as skilled as others, {name} is growing in popularity with the {animals}.",
    "We love {name}.  After being courted by many of the top zoos in the world including the City Zoo of {city}, {name} came to us knowing our reputation for fostering {special} and our love of {animals}."
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

  private animals = ["penguins", "meerkats", "dolphins", "goldfish", "ants", "elephants", "pigs", "kittens", "giraffes", "ducks", "pigeons", "water-buffalo", "orcas"];
  private cities = ["London", "New York", "Chicago", "Bakersfield", "Stockton", "Davis", "Boston", "Vienna", "Hong Kong", "Carson", "Reno", "Pasadena", "Altadena", "Tokyo", "Pawnee"];
  private specialities = ["Scat Analysis", "Ear Wax Sculpting", "Hair/Fur Styling", "Paw Counting", "Feather Fluffing", "Rock Measuring", "Tree Fluffing", "Ice Cream Dispensing"];
  private occupations = ["traffic warden", "street-light cleaner", "social-distancing enforcer", "Mindcraft evangelist", "pigeon counter", "table-leg counter", "mind-reader", "tree climber", "fish feeder", "environmental hen"];
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


