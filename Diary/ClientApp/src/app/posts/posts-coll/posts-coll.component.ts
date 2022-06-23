import { Component, Inject, Input } from '@angular/core'

import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';

import { IPost } from '../../models/post.model';


@Component({
  selector: 'app-posts-coll',
  templateUrl: './posts-coll.component.html',
  styleUrls: ['./posts-coll.component.scss']
})

export class PostsCollComponent {

  posts: IPost[] = [];
  check: boolean =  false

  isLoader: boolean = true;

  constructor(
    private postService: PostService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getFresh();
  }
  getFresh() {
    let user = this.userService.getUserFromLocalStorge();

    this.postService.getCollPost(user.email).subscribe((posts) =>  {

      this.posts = this.postService.createPostSubItem(posts)
      this.isLoader = false;
    });
  }
  dataSearchHandler(data : any) {
    this.isLoader = true;
    this.posts = this.postService.createPostSubItem(data)
    this.isLoader = false;
  }  
}
