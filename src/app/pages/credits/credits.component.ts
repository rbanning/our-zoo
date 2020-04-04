import { Component, OnInit } from "@angular/core";

const TEST_SIZE = 8;

export interface ICredit {
  id: string;
  name: string;
  thumb: string;
}

const creditGenerator = function(size: number): ICredit[] {
  const ret = [];
  for (let i = 1; i <= size; i++) {
    ret.push({
      id: `@photo${i}`,
      name: `Photographer #${i}`,
      thumb: `https://picsum.photos/id/${i}/200/200`
    });
  }
  return ret;
};

@Component({
  selector: "app-credits",
  templateUrl: "./credits.component.html",
  styleUrls: ["./credits.component.scss"]
})
export class CreditsComponent implements OnInit {
  panels: ICredit[];
  translateX: number = 0;
  current = 0;

  private width: number = 600;


  constructor() {}

  ngOnInit(): void {
    this.panels = creditGenerator(TEST_SIZE);
  }

  setCurrent(value: number) {
    console.log("click");
  }

  goto(index: number) {
    if (index >= 0 && index < this.panels.length) {
      this.current = index;
      this._animate(this.translateX, this._calculateTranslate(), 30);
    }
  }

  pan(event) {
    const { deltaX, isFinal } = event;

    if (deltaX < 0) {
      //pan right (reveal next panel)
      //only react if there are more panels to reveal to the right
      if (this.current < this.panels.length - 1) {
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
