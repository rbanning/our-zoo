import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { IArea } from '@app/common/area';

@Component({
  selector: 'app-area-badge',
  templateUrl: './area-badge.component.html',
  styleUrls: ['./area-badge.component.scss']
})
export class AreaBadgeComponent implements OnInit {
  @Input()
  area: IArea;

  @Input()
  size: number = 50;

  @Input()
  inclName: boolean = true;

  @HostListener("click") onClick() {
    this.router.navigate(['areas', this.area.id]);
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
