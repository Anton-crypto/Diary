import { Component } from '@angular/core'
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-work-post',
  templateUrl: './work-post.component.html',
  styleUrls: ['./work-post.component.scss']
})

export class WorkPostComponent {

  selectedFile: File | null = null;
  selectedFileUrl: FileReader | null | string = null;

  title : string = ""

  bodyItem : ITest[] = [
    {
      teg : "text",
      value : ""
    },
  ]
  
  constructor(private postService: PostService) { }

  onFileSelected(event : any) {
    
    this.selectedFile = <File>event.target.files[0];
    var reader  = new FileReader();

    reader.onload = (event: any) => {
      this.selectedFileUrl = event.target.result;
      this.bodyItem.push(
      {
        teg : "image",
        value : event.target.result,
        file : this.selectedFile!
      });
    };

    reader.readAsDataURL(this.selectedFile);

    //console.log(this.selectedFileUrl)
  }

  ngOnInit(): void {
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
  addTextFild(): void {
    this.bodyItem.push({teg : "text" , value : ""})
  }
  addInputVidioFild(): void {
    this.bodyItem.push({teg : "input" , value : ""})
  }
  addVidioFild(link: string, index: number): void {
    if(link) {
      const vidioLick : string[] = link.split("=");
      if(vidioLick.length > 1) {
        const vidioLickId : string[] = vidioLick[1].split('&');
        if(vidioLickId.length > 1) {
          setTimeout(() => {this.bodyItem[index] = {teg : "vidio" , value : vidioLickId[0]}}, 1000)
        }
      }
    }
  }
  deleteItemFile(index: number) {
    this.bodyItem.splice(index, 1);
  }
  upItem(index: number) {
    [this.bodyItem[index - 1], this.bodyItem[index]] = [this.bodyItem[index], this.bodyItem[index - 1]]
  }
  downItem(index: number) {
    [this.bodyItem[index], this.bodyItem[index + 1]] = [this.bodyItem[index + 1], this.bodyItem[index]]
  }
  addNewPost() {
    if (this.bodyItem.length > 0 || this.bodyItem[0].value != '') {

      let files : File[] = []
      const formData = new FormData();

      let index: number = 0;

      this.bodyItem.forEach(item  => {
        if(item.teg == "image") {
          if(item.file) {
            formData.append('font-' + index, item.file);
            index++;
          }
        };
        if(item.teg == "text") {
          formData.append('text-' + index, item.value);
          index++;
        };
        if(item.teg == "vidio") {
          formData.append('vidio-' + index, item.value);
          index ++;
        };
      });

      let user = JSON.parse(localStorage.getItem("user")!);

      formData.append('email-0', user.email);
      formData.append('title-0', this.title);

      this.postService.addPost(formData).subscribe((() => {
        this.reset();
      }));
    }
  }
  private reset() : void {
    
  this.selectedFile = null;
  this.selectedFileUrl = null;

  this.title = ""

  this.bodyItem  = [
    {
      teg : "text",
      value : ""
    },
  ]
  }
}

export interface ITest {
  teg: string
  value: any
  file?: File
}
