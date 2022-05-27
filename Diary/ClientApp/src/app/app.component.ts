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

  ngOnInit(): void {
    if(localStorage.getItem("team") && localStorage.getItem("isCheckedTeam")) {

      let team = JSON.parse(localStorage.getItem("team")!);
      let isCheckedTeam = JSON.parse(localStorage.getItem("isCheckedTeam")!);
      let activeElemen = localStorage.getItem("activeElemen");

      if(team) {
        team.forEach((item : any) => {
          this._elementRef.nativeElement.style.setProperty(item.key, item.value);
        });
      }
      if(isCheckedTeam) {
        this.isCheckedTeam = isCheckedTeam.isChecked;
      }
      if(activeElemen) {
        this._elementRef.nativeElement.style.setProperty('--colorActiveElemen', activeElemen);
      }
    }
  }

  colorSvap(color: string) : void {
    this._elementRef.nativeElement.style.setProperty('--colorActiveElemen', color);

    localStorage.setItem("activeElemen", color);
  }
  colorSvapTeam() {
    if(this.isCheckedTeam) {

      this._elementRef.nativeElement.style.setProperty('--colorBackGround', 'var(--colorBackGroundBlack)');
      this._elementRef.nativeElement.style.setProperty('--colorBackGroundElement', 'var(--colorBackGroundElementBlack)');

      this._elementRef.nativeElement.style.setProperty('--colorTitleText', 'var(--colorTitleTextWhite)');

      let masStyle : Array<any> = [

        {key: "--colorBackGround", value : "var(--colorBackGroundBlack)"},
        {key: "--colorBackGroundElement", value : "var(--colorBackGroundElementBlack)"},
        {key: "--colorTitleText", value : "var(--colorTitleTextWhite)"},
      ]

      localStorage.setItem("team", JSON.stringify(masStyle));
      localStorage.setItem("isCheckedTeam", JSON.stringify({isChecked : true}));

    } else {
      this._elementRef.nativeElement.style.setProperty('--colorBackGround', 'var(--colorBackGroundWhite)');
      this._elementRef.nativeElement.style.setProperty('--colorBackGroundElement', 'var(--colorBackGroundElementWhite)');

      this._elementRef.nativeElement.style.setProperty('--colorTitleText', 'var(--colorTitleTextBlack)');

      let masStyle : Array<any> = [

        {key: "--colorBackGround", value : "var(--colorBackGroundWhite)"},
        {key: "--colorBackGroundElement", value : "var(--colorBackGroundElementWhite)"},
        {key: "--colorTitleText", value : "var(--colorTitleTextBlack)"},
      ]

      localStorage.setItem("team", JSON.stringify(masStyle));
      localStorage.setItem("isCheckedTeam", JSON.stringify({isChecked : false}));
    }
  }
}
