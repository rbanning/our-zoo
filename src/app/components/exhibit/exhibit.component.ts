import { Component, OnInit, Input } from '@angular/core';
import { IExhibit } from '@app/common/exhibit';

@Component({
  selector: 'app-exhibit',
  templateUrl: './exhibit.component.html',
  styleUrls: ['./exhibit.component.scss']
})
export class ExhibitComponent implements OnInit {
  @Input()
  exhibit: IExhibit;

  @Input()
  size: number = 900;

  get width() {
    return `${this.size}px`;
  }

  reveal: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
