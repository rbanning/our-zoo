import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { CreditService } from '@app/services/credit.service';
import { ICredit } from '@app/common/credit';

@Component({
  selector: "app-credits",
  templateUrl: "./credits.component.html",
  styleUrls: ["./credits.component.scss"]
})
export class CreditsComponent implements OnInit {
  credits$: Observable<ICredit[]>;
  current: string;

  constructor(
    private creditService: CreditService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.current = params.id;
      console.log("Credits", {params, current: this.current});
      this.credits$ = this.creditService.credits$
        .pipe(
          map((credits: ICredit[]) => {
            return !this.current ? credits :
              credits.filter(c => c.id === this.current);
          })
        )
    });
  }

}
