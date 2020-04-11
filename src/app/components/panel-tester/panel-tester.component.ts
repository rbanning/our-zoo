import { PanelDirective } from './../../directives/panel.directive';
import { Component, ContentChildren, QueryList, ElementRef, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-panel-tester',
  templateUrl: './panel-tester.component.html',
  styleUrls: ['./panel-tester.component.scss']
})
export class PanelTesterComponent implements AfterContentInit {
  @ContentChildren(PanelDirective, {descendants: true, read: ElementRef}) panels !: QueryList<ElementRef>;

  current: number = 0;
  heights: number[] = [];
  get currentHeight() {
    if (this.current >= 0 && this.current < this.heights.length) {
      return `${this.heights[this.current]}px`;
    }
    //else
    return null;
  }

  constructor() { }

  ngAfterContentInit(): void {
    this.heights = this.panels.map((el: ElementRef) => {
      return el.nativeElement.clientHeight;
    });
    console.log("Panel Tester", {panels: this.panels, heights: this.heights});
    this._setCurrent(0);
  }

  next() {
    this._setCurrent(Math.min(this.current + 1, this.panels.length - 1));
  }
  back() {
    this._setCurrent(Math.max(this.current - 1, 0));
  }

  private _setCurrent(value) {
    this.current = value;
    this.panels.forEach((el, i) => { el.nativeElement.style.display = i === value ? 'inline-block' : 'none'} );
  }
}
