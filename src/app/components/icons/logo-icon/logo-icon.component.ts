import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, tap, delay } from "rxjs/operators";

const icons = [
  "hippo-regular.svg",
  "kiwi-bird-regular.svg",
  "monkey-regular.svg",
  "narwhal-regular.svg",
  "ram-regular.svg",
  "turtle-regular.svg",

  "cat-regular.svg",
  "fish-regular.svg",
  "pig-regular.svg",
  "duck-regular.svg",
  "spider-regular.svg",
  "pegasus-regular.svg",
  "elephant-regular.svg",
];

@Component({
  selector: 'app-logo-icon',
  templateUrl: './logo-icon.component.html',
  styleUrls: ['./logo-icon.component.scss']
})
export class LogoIconComponent implements OnInit {
  @Input()
  size: string = "30px";

  @Input()
  alt: string = "Our Zoo Icon";

  @Input()
  icon: string = null;

  @Input()
  interval: number = 15000;

  currentIcon: string;
  pendingIcon: string;
  working: boolean = false;

  @HostBinding("style.width") hostWidth;

  constructor() { }

  ngOnInit(): void {
    this.hostWidth = this.size;
    this.currentIcon = this.getIcon();
    interval(Math.max(this.interval, 200))
      .pipe(
        map((_) => {
          return this.getIcon();
        })
      ).subscribe((icon: string) => {
        this.pendingIcon = icon;
        this.working = true;
        setTimeout(_ => {
          this.currentIcon = icon;
          this.working = false;
        }, 2000);
      });
  }

  getIcon() {
    return this.icon || `/assets/${icons[(Math.random() * icons.length) | 0]}`;
  }

}
