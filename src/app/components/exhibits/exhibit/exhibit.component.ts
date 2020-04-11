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

  private readonly DELAY: number = 100;
  loadedImage: string = null; //todo - load the image from the exhibit
  failedImage: string = null;

  constructor() { }

  ngOnInit(): void {
    this.prefetchImage(this.exhibit.imagePath);
  }

  prefetchImage(path) {
    this.loadedImage = null;
    this.failedImage = null;

    const img = new Image();
    img.onload = () => {
      setTimeout(() => {
        this.loadedImage = path;
      }, this.DELAY);
    }
    img.onerror = () => {
      setTimeout(() => {
        this.failedImage = "Oops... unable to retrieve the exhibit.  Please try again later.";
        console.log("Image Failed");
      }, this.DELAY);
    }

    img.src = path;
  }
}
