import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { KeeperService } from '@app/services';
import { IKeeper } from '@app/common/keeper';

@Component({
  selector: 'app-keepers',
  templateUrl: './keepers.component.html',
  styleUrls: ['./keepers.component.scss']
})
export class KeepersComponent implements OnInit {
  keepers$: Observable<IKeeper[]>;

  constructor(
    private keeperService: KeeperService
  ) { }

  ngOnInit(): void {
    this.keepers$ = this.keeperService.keepers$;
  }

}
