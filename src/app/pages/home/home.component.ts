import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AreaService } from '@app/services';
import { IArea } from '@app/common/area';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  areas$: Observable<IArea[]>;

  constructor(
    private areaService: AreaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.areas$ = this.areaService.areas$;
  }

  goto(area: IArea) {
    if (area) {
      this.router.navigate(["/areas", area.id]);
    }
  }

}
