import { Component, ElementRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isCheckedTeam = true;

  private _style = '';

  constructor(
    private _elementRef: ElementRef,
    private _sanitizer: DomSanitizer
  ) {}

  colorSvap(color: string) : void {
    this._elementRef.nativeElement.style.setProperty('--colorActiveElemen', color);
  }
  colorSvapTeam() {
    if(this.isCheckedTeam) {
      this._elementRef.nativeElement.style.setProperty('--colorBackGround', 'var(--colorBackGroundBlack)');
    } else {
      this._elementRef.nativeElement.style.setProperty('--colorBackGround', 'var(--colorBackGroundWhite)');
    }
  }
}
