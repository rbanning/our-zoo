import { Component, OnInit, Input, ChangeDetectionStrategy, HostBinding, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ICredit } from '@app/common/credit';

@Component({
  selector: 'app-credit-badge',
  templateUrl: './credit-badge.component.html',
  styleUrls: ['./credit-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditBadgeComponent implements OnInit {
  @Input()
  credit: ICredit;

  @Input()
  size: number = 30;

  @HostListener("click") onClick() {
    this.router.navigate(['credits', this.credit.id]);
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
