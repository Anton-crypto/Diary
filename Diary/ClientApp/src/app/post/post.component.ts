import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../service/post.service';
import { ModerService } from '../service/moder.service';

import { IPost } from '../models/post.model';
import { ISaved } from '../models/saved.model';
import { IUser } from '../models/user.model';
import { ILike } from '../models/like.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent {

  constructor (
    private postService: PostService,
    private moderService: ModerService
  ) { }
  @Input() post: IPost | undefined;
  user: IUser | undefined;

  isSaved : boolean = true
  isLike : boolean = true
  userRole : string = ""

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!);
    this.userRole = this.postService.getRout();

    if(this.post != undefined && this.user != undefined) {
      if(this.post.likes != undefined) {
        if(this.contains(this.post.likes, this.user.id)) {
          this.isLike = false
        }
      }
      if(this.post.saveds != undefined) {
        if(this.contains(this.post.saveds, this.user.id)) {
          this.isSaved = false
        }
      }
    }

  }
  contains(arr: any [], elem : string) : boolean {
    return arr.length == 0 ? false : arr.find((i : any) => {i.userID.toString() == elem.toString()}) != -1;
  }
  
  reject() {
    if(this.post && this.post.id) {
      this.moderService.reject(this.post.id.toString()).subscribe((() => { this.isSaved = false }));
    }
  }
  example() {
    if(this.post && this.post.id) {
      this.moderService.example(this.post.id.toString()).subscribe((() => { this.isSaved = false }));
    }
  }
  public savedPost () {
    
    let saved : ISaved = {
      postId : this.post!.id.toString(),
      userID : this.user!.id.toString(),
    }
    this.postService.savedPost(saved).subscribe((() => { this.isSaved = false }));
  }
  public likePost () {
    let like : ILike = {
      postId : this.post!.id.toString(),
      userID : this.user!.id.toString(),
    }
    this.postService.likePost(like).subscribe((() => { this.isLike = false }));
  }
  public unLikePost (id :string) {
    this.postService.unLikePost(id).subscribe((() => {}));
  }
  public unSavedPost (id :string) {
    this.postService.unSavedPost(id).subscribe((() => {}));
  }
  public createImgPath = (serverPath: string) => this.postService.createImgPath(serverPath);
}
