import { IKeeper } from '@app/common/keeper';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keeper-avatar',
  templateUrl: './keeper-avatar.component.html',
  styleUrls: ['./keeper-avatar.component.scss']
})
export class KeeperAvatarComponent implements OnInit {
  @Input()
  keeper: IKeeper

  @Input()
  size: number = 60;

  @Input()
  active: boolean = true;

  @Input()
  background: string = "rgba(255,255,255, 0.8)";

  @Output()
  touch = new EventEmitter<IKeeper>();

  get sizePX() { return `${this.size}px`; }

  constructor() { }

  ngOnInit(): void {
  }

  handleClick() {
    if (this.active) { this.touch.emit({...this.keeper}); }
  }
}
