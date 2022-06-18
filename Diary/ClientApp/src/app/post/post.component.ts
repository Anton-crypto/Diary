import { Component, Inject, Input, ElementRef, ViewChild } from '@angular/core'

import { PostService } from '../service/post.service';
import { ModerService } from '../service/moder.service';
import { UserService } from '../service/user.service';

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
    private userService: UserService,
  ) { }

  @Input() post: IPost | undefined;
  @Input() countComment: number | undefined;

  user: IUser | undefined;

  isSaved : boolean = true
  isLike : boolean = true
  isSize: boolean = true

  idSaved : string = ""
  idLike : string = ""

  userRole : string = ""
  rout : any = ""

  @ViewChild('story__body', { read: ElementRef })
  storyBody: ElementRef | undefined

  ngAfterViewInit(): void {
    let item  = this.storyBody;
    if(item != null) {
      if(this.getClassEndTime(item.nativeElement.offsetHeight)) {
        item.nativeElement.className += " hide"
        console.log(item.nativeElement.className)
      }
    }
  }

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorge();
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
  }
  resize() {
    this.isSize = false
    let item  = this.storyBody;
    if(item != null) {
      item.nativeElement.className = ""
    }
  }
  contains(arr: any [], elem : string) : boolean {
    return arr.length == 0 ? false : arr.find((i : any) => {i.userID.toString() == elem.toString()}) != -1;
  }
  
  reject() {
    if(this.post && this.post.id) {
      this.moderService.reject(this.post.id.toString()).subscribe((() => { this.post = undefined }));
    }
  }
  rejectNSFW() {
    if(this.post && this.post.id) {
      this.moderService.reject(this.post.id.toString()).subscribe((() => { this.post = undefined }));
    }
  }
  example() {
    if(this.post && this.post.id) {
      this.moderService.example(this.post.id.toString()).subscribe((() => {  this.post = undefined }));
    }
  }
  deletePost(id: string) {
    this.postService.deletePost(id).subscribe((() => { this.ngOnInit()}));
  }
  getClassEndTime(size: number): boolean {
    if(size > 400 && this.isSize) {
      return true
    }
    return false
  }
  public savedPost () {
    
    let saved : ISaved = {
      postId : this.post!.id.toString(),
      userID : this.user!.id.toString(),
    }

    this.postService.savedPost(saved).subscribe({
      next: (savedServer) => {
        this.isSaved = false
        this.post!.saveds.push(savedServer);
        this.idSaved = savedServer.id!
      }
    });
  }
  public likePost () {

    let like : ILike = {
      postId : this.post!.id.toString(),
      userID : this.user!.id.toString(),
    }

    this.postService.likePost(like).subscribe({
      next: (likeServer) => {
        this.isLike = false; 
        this.post!.likes.push(likeServer); 
        this.idLike = likeServer.id!
      }
    });
  }
  public unLikePost () {
    this.postService.unLikePost(this.idLike).subscribe({
      next: (like) => {
        this.isLike = true
        this.post!.likes = this.post!.likes.filter(item => item.id !== like.id);
        this.idLike = ""
      }
    });
  }
  public unSavedPost () {
    this.postService.unSavedPost(this.idSaved).subscribe({
      next: (saved) => {
        this.isSaved = true 
        this.post!.saveds = this.post!.saveds.filter(item => item.id !== saved.id);
        this.idSaved = ""
      }
    });
  }
  public createImgPath = (serverPath: string) => this.postService.createImgPath(serverPath);
}
