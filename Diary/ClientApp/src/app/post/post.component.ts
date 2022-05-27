import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../service/post.service';
import { ModerService } from '../service/moder.service';
import { ActivatedRoute } from '@angular/router';

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
    private moderService: ModerService,
    private route: ActivatedRoute,
  ) { }
  @Input() post: IPost | undefined;
  user: IUser | undefined;

  isSaved : boolean = true
  isLike : boolean = true

  idSaved : string = ""
  idLike : string = ""

  userRole : string = ""
  rout : any = ""

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!);
    this.userRole = this.postService.getRout();
    this.rout = this.route.snapshot.routeConfig!.path

    if(this.post != undefined && this.user != undefined) {
      if(this.post.likes != undefined) {
        this.post.likes.forEach(like => {
          if(this.user != undefined && like.userID == this.user.id) {
            this.isLike = false
            this.idLike = like.id!
          }
        });
      }
      if(this.post.saveds != undefined) {
        this.post.saveds.forEach(save => {
          if(this.user != undefined && save.userID == this.user.id) {
            this.isSaved = false
            this.idSaved = save.id!
          }
        });
      }
    }
    console.log(this.post!.likes)

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
  deletePost() {

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
  public unLikePost () {
    this.postService.unLikePost(this.idLike).subscribe((() => { this.isLike = true }));
  }
  public unSavedPost () {
    this.postService.unSavedPost(this.idSaved).subscribe((() => { this.isSaved = true }));
  }
  public createImgPath = (serverPath: string) => this.postService.createImgPath(serverPath);
}
