import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private exhibitService: ExhibitService,
    private areaService: AreaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.areas$ = this.areaService.areas$;
      if (id) {
        this.currentArea = this.areaService.lookup(id);
        this.exhibits$ = this.exhibitService.exhibit$
          .pipe(
            map((exhibits: IExhibit[]) => {
              console.log("Exhibits", exhibits);
              return exhibits.filter((e: IExhibit) => e.area && e.area.id === id);
            })
          );
      }
    });
  }

}
