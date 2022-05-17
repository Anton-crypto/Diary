import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../service/post.service';
import { IPost } from '../models/post.model';
import { ISaved } from '../models/saved.model';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent {

  constructor(private postService: PostService) { }
  @Input() post: IPost | undefined;
  user: IUser | undefined;

  isSaved : boolean = true

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("userExtendedModel")!);

    if(this.post != undefined && this.post.saveds != undefined && this.user != undefined) {
      if(this.contains(this.post.saveds, this.user.id)) {
        this.isSaved = false
      }
    }
  }
  contains(arr: any [], elem : string) : boolean {
    return arr.length == 0 ? false : arr.find((i : any) => {i.userID.toString() == elem.toString()}) != -1;
  }
  public savedPost () {
    

    let saved : ISaved = {
      postId : this.post!.id.toString(),
      userID : this.user!.id.toString(),
    }
    this.postService.savedPost(saved).subscribe((() => {}));
  }
  public unSavedPost (id :string) {
    this.postService.unSavedPost(id).subscribe((() => {}));
  }
  public createImgPath = (serverPath: string) => this.postService.createImgPath(serverPath);
}
