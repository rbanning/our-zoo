import { Component, OnInit, Input, ContentChildren, AfterContentInit, ElementRef, QueryList } from '@angular/core';
import * as utils from '@app/common/utilities';
import { PanelDirective } from '@app/directives/panel.directive';

@Component({
  selector: 'app-panel-slider',
  templateUrl: './panel-slider.component.html',
  styleUrls: ['./panel-slider.component.scss']
})
export class PanelSliderComponent implements OnInit, AfterContentInit {
  @ContentChildren(PanelDirective, {descendants: true, read: ElementRef}) panelRefs !: QueryList<ElementRef>;

  @Input()
  width: number;

  @Input()
  nav: boolean = true;

  translateX: number = 0;
  current = 0;
  panels: string[];     //used to create the bubble nav
  count: number;
  private heights: number[] = [];
  get currentHeight(): number {
    if (this.current >= 0 && this.current < this.heights.length) {
      return this.heights[this.current];
    }
    //else
    return null;
  }

  constructor() { }

  ngOnInit(): void {
    this.panels = utils.buildArray(this.count, (v, i) => null);
    console.log("Panel Slided OnInit", {panelRefs: this.panelRefs, heights: this.heights});
  }

  ngAfterContentInit(): void {
    this.heights = this.panelRefs.map((el: ElementRef) => {
      console.log("Panel Height", {el, height: el.nativeElement.clientHeight});
      return el.nativeElement.clientHeight;
    });
    console.log("Panel Slider", {panelRefs: this.panelRefs, heights: this.heights});
  }

  goto(index: number) {
    if (index >= 0 && index < this.count) {
      this.current = index;
      this._animate(this.translateX, this._calculateTranslate(), 30);
    }
  }

  pan(event) {
    const { deltaX, isFinal } = event;

    if (deltaX < 0) {
      //pan right (reveal next panel)
      //only react if there are more panels to reveal to the right
      if (this.current < this.count - 1) {
        if (isFinal) {
          this.current++;
          this._animate(this.translateX, this._calculateTranslate());
        } else {
          this.translateX = this._calculateTranslate() + deltaX;
        }
      }
    } else if (deltaX > 0) {
      //pan left (reveal previous panel)
      //only react if there are previous panels to reveal to the left
      if (this.current > 0) {
        if (isFinal) {
          this.current--;
          this._animate(this.translateX, this._calculateTranslate());
        } else {
          this.translateX = this._calculateTranslate() + deltaX;
        }
      }
    }
  }

  private _calculateTranslate() {
    return -1 * this.width * this.current;
  }

  private _animate(from: number, to: number, amount: number = 10) {
    const delta: number = amount * (from > to ? -1 : 1);
    this.translateX = from;
    const timeout = setInterval(_ => {
      this.translateX = this.translateX + delta;
      if (this._pastTarget(this.translateX, to, delta)) {
        this.translateX = to;
        clearInterval(timeout);
      }
    }, 1);
  }

  private _pastTarget(current: number, target: number, delta: number) {
    return (current > target && delta > 0)
      || (current < target && delta < 0);
  }

}
