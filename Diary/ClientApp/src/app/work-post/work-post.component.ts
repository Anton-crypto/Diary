import { Component } from '@angular/core'

@Component({
  selector: 'app-work-post',
  templateUrl: './work-post.component.html',
  styleUrls: ['./work-post.component.scss']
})

export class WorkPostComponent {

  selectedFile: File | null = null;
  selectedFileUrl: FileReader | null | string = null;

  bodyItem : ITest[] = [
    {
      teg : "text",
      value : ""
    },
  ]
  
  constructor() { }

  onFileSelected(event : any) {
    
    this.selectedFile = <File>event.target.files[0];
    var reader  = new FileReader();

    reader.onload = (event: any) => {
      this.selectedFileUrl = event.target.result;
      this.bodyItem.push(
      {
        teg : "image",
        value : event.target.result
      });
    };

    reader.readAsDataURL(this.selectedFile);

    console.log(this.selectedFileUrl)
  }

  ngOnInit(): void {
  }
  addTextFild(): void {
    this.bodyItem.push({teg : "text" , value : ""})
  }
}

export interface ITest {
  teg: string
  value: any
}
