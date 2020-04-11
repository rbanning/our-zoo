import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPanel]'
})
export class PanelDirective {
  constructor(
    el: ElementRef
  ) {
    el.nativeElement.className =  [...el.nativeElement.className.split(" ").filter(Boolean), "app-panel"].join(" ");
    console.log("appPanel", {el});
  }
}
