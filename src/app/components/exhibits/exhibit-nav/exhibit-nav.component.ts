import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IExhibit } from '@app/common/exhibit';

@Component({
  selector: 'app-exhibit-nav',
  templateUrl: './exhibit-nav.component.html',
  styleUrls: ['./exhibit-nav.component.scss']
})
export class ExhibitNavComponent implements OnInit {
  @Input()
  exhibits: IExhibit[];

  @Input()
  current: string;

  @Output()
  selected = new EventEmitter<IExhibit>();

  constructor() { }

  ngOnInit(): void {
  }

  select(exhibit: IExhibit) {
    if (exhibit) {
      this.current = exhibit.id;
      this.selected.emit(exhibit);
    }
  }
}
