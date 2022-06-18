import { Component, OnInit } from '@angular/core'

import { PostService } from '../../service/post.service';
import { UserService } from 'src/app/service/user.service';

import { IPost } from '../../models/post.model';


@Component({
  selector: 'app-posts-subs',
  templateUrl: './posts-subs.component.html',
  styleUrls: ['./posts-subs.component.scss']
})

export class PostsSubsComponent implements OnInit {

  posts: IPost[] = [];
  check: boolean =  false
  
  constructor(
    private postService: PostService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getSubsPosts();
  }
  getSubsPosts() {
    let user = this.userService.getUserFromLocalStorge();
    
    if(user != undefined) {
      this.postService.getPostSubscriptions(user.id).subscribe((posts) =>  {

        this.posts = this.postService.createPostSubItem(posts)
        this.check = true;
  
        console.log(this.posts)
      });
    }
  }
  dataSearchHandler(data : any) {

    this.check = false;
    this.posts = this.postService.createPostSubItem(data)
    this.check = true;

    console.log(data)
  }  
}
