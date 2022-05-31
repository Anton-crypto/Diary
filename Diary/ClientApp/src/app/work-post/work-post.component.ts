import { Component, OnInit } from '@angular/core'

import { PostService } from '../service/post.service';
import { UserService } from '../service/user.service';

import { ActivatedRoute } from '@angular/router';
import { IPost } from '../models/post.model';

@Component({
  selector: 'app-work-post',
  templateUrl: './work-post.component.html',
  styleUrls: ['./work-post.component.scss']
})

export class WorkPostComponent implements OnInit {

  selectedFile: File | null = null;
  selectedFileUrl: FileReader | null | string = null;

  title : string = ""
  idPost : string | undefined = ""

  IsMessage : boolean = true
  bodyItem : ITest[] = [
    {
      teg : "text",
      value : "",
    },
  ]
  searchSet : any = {
    name : "Теги",
    value : "",
    tegs : [],
  }
  
  post : IPost | undefined
  
  constructor(
    private postService: PostService,    
    private route: ActivatedRoute,
    private userService: UserService,
  ) { 

  }
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
  }
  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    this.idPost = this.route.snapshot.paramMap.get('id')?.toString();

    if(this.idPost != undefined) {
      this.getPost(this.idPost);
    }
  }
  getPost(id: string) {
    this.postService.getPost(id).subscribe(((post) => {
      this.post = this.postService.createPostSubItem([post])[0]
      this.bodyItem = []
      this.title = this.post.title
      console.log(this.post)
      this.post.postItem.forEach(item => {
        
        if(item.text != undefined) {
          this.bodyItem.push({teg : "text" , value : item.text});
        }
        if(item.imgUrl != undefined) {
          this.bodyItem.push({teg : "image" , value : item.imgUrl, id : item.id});
        }
        if(item.vidioUrl != undefined) {
          this.bodyItem.push({teg : "vidio" , value : item.vidioUrl});
        }
      });
      if(this.post!.tegs != undefined) {
        this.searchSet.tegs = this.post!.tegs.substring(0, this.post!.tegs.length - 1).split(',')
      }
    }));
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
  putPost() {
    if (this.bodyItem.length > 0 || this.bodyItem[0].value != '') {
      let files : File[] = []
      const formData = new FormData();

      let index: number = 0;

      this.bodyItem.forEach(item  => {
        if(item.teg == "image") {
          if(item.file) {
            formData.append('font-' + index, item.file);
            index++;
          } else {
            formData.append('img-' + index, item.id!);
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
      let teg: string = "";
      this.searchSet.tegs.forEach((item: any) => {
        teg += item + ","
      })

      formData.append('teg', teg);
      formData.append('title', this.title);
      formData.append('id', this.idPost!.toString());

      this.postService.putPost(formData).subscribe((() => {
        this.reset();

        this.IsMessage = false;
        setTimeout(() => {this.IsMessage = true}, 3000)

      }));
    }
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

      let teg: string = "";
      
      this.searchSet.tegs.forEach((item: any) => {
        teg += item + ","
      })

      let user = this.userService.getUserFromLocalStorge();

      formData.append('email', user.email);
      formData.append('title', this.title);
      formData.append('teg', teg);

      this.postService.addPost(formData).subscribe((() => {
        this.reset();

        this.IsMessage = false;
        setTimeout(() => {this.IsMessage = true}, 5000)
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
  addTeg (event : any) {
    if(event.keyCode !== 13 ) return;
    if(this.searchSet.value.length == 0) return;

    this.searchSet.tegs.push(this.searchSet.value.toString())
    this.searchSet.value = ""
  }
  deleteTeg (index : any) {
    this.searchSet.tegs.splice(index, 1);
  }
  public createImgPath = (serverPath: string) => this.postService.createImgPath(serverPath);
}

export interface ITest {
  teg: string
  value: any
  file?: File
  id?: string
}
