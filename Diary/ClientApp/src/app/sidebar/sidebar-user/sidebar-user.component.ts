import { Component, Inject } from '@angular/core'
import { UserService } from '../../service/user.service';
import { IUser } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from '../../service/post.service';
import { IPost } from '../../models/post.model';
import { ISubscriptions } from 'src/app/models/subscriptions.model';
import { SubscriptionService } from '../../service/subs.service';
import { ModerService } from 'src/app/service/moder.service';


@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.scss']
})

export class SidebarUserComponent {

  constructor(
    private userService: UserService, 
    private location: Location,
    private route: ActivatedRoute,
    private postService: PostService,
    private subsService: SubscriptionService,
  ) { }
  
  user: IUser | undefined;
  userRole: string = ""
  posts: IPost[] = [];
  reting: number  = 0
  sub: ISubscriptions | undefined
  isSub : boolean = false
  subWriter: ISubscriptions [] | undefined = []

  ngOnInit(): void {
    this.getUser();
  }
  
  getUser() {
    let user = JSON.parse(localStorage.getItem("user")!);
    this.userRole = localStorage.getItem("role")!;

    console.log(this.userRole)
    
    if(user) {
      this.userService.getUserOnEmail(user.email).subscribe({
        next: (user: IUser) => {
          this.user = user;
          this.getPosts(user.id);
          this.getWriterAll();
        },
        error: () => {
          this.logOut();
        }
      })
    }
  }
  getWriterAll() {
    this.subsService.getWriterAll(this.user!.id!).subscribe((subs) => {
      this.subWriter = subs;
    });
  }
  getPosts(id: string) {
    this.postService.getMyPosts(id).subscribe((posts) =>  {
      this.posts = this.postService.createPostSubItem(posts)

      this.posts.forEach(post => {
        //this.commentCount += post.comments.length;
        this.reting += (post.likes.length + post.comments.length + post.saveds.length) * 100;
      });
    });
  }
  logOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    
    window.location.reload();
  }
  public createImgPath = (serverPath: string) => this.userService.createImgPath(serverPath);
}
