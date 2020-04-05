import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IArea, Area } from '@app/common/area';
import { CreditService } from './credit.service';

@Injectable()
export class AreaService {
  private areaSubject: BehaviorSubject<IArea[]>;
  areas$: Observable<IArea[]>;

  constructor(
    creditService: CreditService
  ) {
    this.areaSubject = new BehaviorSubject<IArea[]>(
      areas.map(a => {
        return new Area({
          ...a,
          credit: creditService.lookup(a.credit)
        });
      })
    );
    this.areas$ = this.areaSubject.asObservable();
   }
}

const areas = [
  { name: 'The Savanna', credit: "Markus Spiske", color: "#DBBC96", tagline: "Bringing the Savanna To Life is not just a slogan… it's our promise.", description: "" },
  { name: "Coral Reef", credit: "Shelby Cohron", color: "#A745DC", tagline: "Keeping The Coral Floral!", description: "" },
  { name: "Open Ocean", credit: "Das Sasha", color: "#549398", tagline: "Adventure down under.", description: "" },
  { name: "Our Sierras", credit: "David Pisnoy", color: "#B7BDBE", tagline: "The clearest way into the Universe is through the Sierras", description: "" },
  { name: "Edge of the Forest", credit: "Dan Meyers", color: "#AA9D5A", tagline: "We Love Dreamers", description: "" },
  { name: "Deep Forest", credit: "Annie Spratt", color: "#2E653F", tagline: "Forests for a Living Planet", description: "" },
  { name: "Rainy Forest", credit: "Jeremy Bishop", color: "#B0CE45", tagline: "Let The Green Be Seen", description: "" },
  { name: "Arctic Circle", credit: "Orlova Maria", color: "#88BFC2", tagline: "Wake up and smell the permafrost", description: "" },
  { name: "The Grasslands", credit: "Marc Wilnauer", color: "#4D772E", tagline: "Anybody can love the mountains, but it takes a soul to love the prairie", description: "" },
  { name: "Desert", credit: "Heather Shevlin", color: "#F7D2B7", tagline: "Polish comes from the cities; wisdom from the desert.", description: "" },
  { name: "Fancy Meadow", credit: "Steve Johnson", color: "#FAA957", tagline: "A brush of perfection.", description: "" },
];


/* NOTES

savanna - Markus Spiske
coral reef - Shelby Cohron
ocean - Das Sasha
sierras - David Pisnoy
edge of forest - Dan Meyers
deep forest - Steve Johnson
rain forest - Jeremy Bishop
artic circle - Orlova Maria
grasslands - Marc Wilnauer
desert - Heather Shevlin
meadow - Steve Johnson

*/
