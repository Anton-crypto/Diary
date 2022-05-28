import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { IUser } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../../models/post.model';
import { PostService } from '../../service/post.service';
import { ISubscriptions } from 'src/app/models/subscriptions.model';
import { SubscriptionService } from '../../service/subs.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent {

  constructor (
    private userService: UserService,
    private route: ActivatedRoute,
    private subsService: SubscriptionService,
    private postService: PostService,
  ){ }
  
  user: IUser | undefined;
  posts: IPost[] = [];
  sub: ISubscriptions | undefined
  id: string | null = ""

  isSub : boolean = false
  isSubCheckUser : boolean = false

  userAuth : IUser | undefined;

  commentCount: number  = 0
  reting: number  = 0

  subWriter: ISubscriptions [] | undefined = []
  userRole: string = ""

  ngOnInit(): void {

    this.userRole = this.postService.getRout();
    this.id = this.route.snapshot.paramMap.get('id');
    this.userAuth = this.userService.getUserFromLocalStorge();

    if(this.id != null) {
      this.getUser(this.id);  
      this.getSub();
      this.getWriterAll();
      
      if(this.userAuth?.id != this.id) this.isSubCheckUser = true;
    }
  }

  getUser(id : string) {
    this.userService.getUser(id).subscribe((user) => {
      this.user = user;
      this.getPosts(user.id);
    });
  }
  getSub() {
    let sub : ISubscriptions = {
      id : "",
      user : [],
      userSubscriptionID: this.userAuth!.id,
      userWriterID : this.id!
    }
    this.subsService.getSub(sub).subscribe((sub) =>  {
      this.sub = sub
      if(this.sub.userSubscriptionID != null) {
        this.isSub = true
        console.log("true")
      }
    });
  }
  getPosts(id: string) {
    this.postService.getMyPosts(id).subscribe((posts) =>  {
      this.posts = this.postService.createPostSubItem(posts)

      this.posts.forEach(post => {
        this.commentCount += post.comments.length;
        this.reting += (post.likes.length + post.comments.length + post.saveds.length) * 100;
      });
    });
  }

  deleteSub() {
    this.subsService.deleteSubs(this.sub!.id!).subscribe(() =>  {
      this.isSub = false
    });
  }
  addSub() {
    let userSub : IUser = JSON.parse(localStorage.getItem("userExtendedModel")!);
    let sub : ISubscriptions = {
      id : "",
      user : [],
      userSubscriptionID: userSub.id,
      userWriterID : this.id!
    }
    console.log(sub)

    this.subsService.addSubs(sub).subscribe(() =>  {
      this.isSub = true
    });
  }
  getWriterAll() {
    this.subsService.getWriterAll(this.id!).subscribe((subs) => {
      this.subWriter = subs;
      console.log(this.subWriter)
    });
  }

  public createImgPath = (serverPath: string) => this.userService.createImgPath(serverPath);
}
