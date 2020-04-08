import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { AreaService, ExhibitService } from '@app/services';
import { IArea } from '@app/common/area';
import { IExhibit } from '@app/common/exhibit';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  exhibits$: Observable<IExhibit[]>;
  areas$: Observable<IArea[]>;
  currentArea: IArea;
  currentExhibit: IExhibit;

  constructor(
    private exhibitService: ExhibitService,
    private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      const exhibitId = params.exhibit;

      this.areas$ = this.areaService.areas$;
      if (id) {
        this.currentArea = this.areaService.lookup(id);
        this.exhibits$ = this.exhibitService.exhibit$
          .pipe(
            map((exhibits: IExhibit[]) => {
              this.currentExhibit = exhibits.find((e: IExhibit) => e.id === exhibitId);
              console.log("Exhibits", exhibits);
              return exhibits.filter((e: IExhibit) => e.area && e.area.id === id);
            }),
            tap((exhibits: IExhibit[]) => {
              this.currentExhibit = exhibits.find((e: IExhibit) => e.id === exhibitId);
              console.log("Current Exhibit", this.currentExhibit);
            })
          );
      }
    });
  }

  jumpTo(exhibit: IExhibit) {
    this.router.navigate(['/areas', this.currentArea.id, exhibit.id]);
  }

}
