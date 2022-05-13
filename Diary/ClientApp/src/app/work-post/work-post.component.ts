import { Component } from '@angular/core'

@Component({
  selector: 'app-work-post',
  templateUrl: './work-post.component.html',
  styleUrls: ['./work-post.component.scss']
})

export class WorkPostComponent {

  selectedFile: File | null = null;
  selectedFileUrl: FileReader | null | string = null;

  bodyText : string = `
    <div
      role="textbox"
      contenteditable="true" 
      class="post__input-body" 
      data-placeholder="Введите текст"
    ></div>
  `
  bodyImg : string = `
    <div *ngIf="selectedFile != null">
      <img class="post__body-img" [src]="selectedFileUrl" alt="" srcset="">
    </div>
  `

  bodyItem : string [] = [
    this.bodyText,
    this.bodyImg,
  ]
  
  constructor() { }

  onFileSelected(event : any) {
    
    this.selectedFile = <File>event.target.files[0];
    var reader  = new FileReader();

    reader.onload = (event: any) => {
      this.selectedFileUrl = event.target.result;
    };

    reader.readAsDataURL(this.selectedFile);

    console.log(this.selectedFileUrl)
  }

  ngOnInit(): void {

  }
}
