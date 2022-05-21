import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { IUser } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../../models/post.model';
import { PostService } from '../../service/post.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent {

  constructor (
    private userService: UserService,
    private route: ActivatedRoute,
    private postService: PostService,
  ){ }
  
  user: IUser | undefined;
  posts: IPost[] = [];

  ngOnInit(): void {
    this.getUser(this.route.snapshot.paramMap.get('id')!);  }

  getUser(id : string) {
    this.userService.getUser(id).subscribe((user) => {
      this.user = user;
      this.getPosts(user.id);

    });
  }
  getPosts(id: string) {
    this.postService.getMyPosts(id).subscribe((posts) =>  {
      this.posts = posts
      let user = JSON.parse(localStorage.getItem("user")!);
      this.posts.forEach(post => {

        const time = this.postService.diffDays(new Date(post.timePost), new Date());
        post.timePost = ` ${time} дня назад`;

        let item : any [] = [] 

        if(post.postImages != undefined && post.postImages.length > 0) 
          item.push(...post.postImages)
        if(post.postTexts != undefined && post.postTexts.length > 0) 
          item.push(...post.postTexts)
        if(post.postVidio != undefined && post.postVidio.length > 0) 
          item.push(...post.postVidio)

        item.sort((a, b) => a.displayNumber > b.displayNumber ? 1 : -1);
        post.postItem = item

        post.isAccessories = user.email == post.user.email ?  true : false;
      });
    });
  }

  public createImgPath = (serverPath: string) => this.userService.createImgPath(serverPath);
}
