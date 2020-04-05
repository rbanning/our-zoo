import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AreaService } from '@app/services';
import { IArea } from '@app/common/area';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {
  areas$: Observable<IArea[]>;
  current: string;

  constructor(
    private areaService: AreaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.current = params.id;
      console.log("Credits", {params, current: this.current});
      this.areas$ = this.areaService.areas$
        .pipe(
          map((area: IArea[]) => {
            return !this.current ? area :
            area.filter(c => c.id === this.current);
          })
        )
    });
  }

}
