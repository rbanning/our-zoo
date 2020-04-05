import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICredit, Credit } from '@app/common/credit';

@Injectable()
export class CreditService {
  private creditSubject: BehaviorSubject<ICredit[]>;
  credits$: Observable<ICredit[]>;

  constructor() {
    this.creditSubject = new BehaviorSubject<ICredit[]>(
      photographers.map(name => {
        const parts = (name+"|").split("|");
        return new Credit({name: parts[0], id: parts[1]});
      })
    );

    this.credits$ = this.creditSubject.asObservable();
   }

   lookup(target: string) {
     const key = target.indexOf('@') === 0 ? 'id' : 'name';
     return this.creditSubject.value.find((c: ICredit) => c[key] === target);
   }
}

// see area.service for list of photographers
const photographers = [
  "Jeremy Bishop",
  "Shelby Cohron|@scohron",
  "Steve Johnson|@steve_j",
  "Orlova Maria",
  "Dan Meyers|@dmey503",
  "David Pisnoy",
  "Das Sasha|@dasdasha2015",
  "Heather Shevlin|@thehmstravels",
  "Markus Spiske",
  "Annie Spratt",
  "Marc Wilnauer|@wk25",
];

