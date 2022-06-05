import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../../service/post.service';
import { IPost } from '../../models/post.model';


@Component({
  selector: 'app-posts-subs',
  templateUrl: './posts-subs.component.html',
  styleUrls: ['./posts-subs.component.scss']
})

export class PostsSubsComponent {

  posts: IPost[] = [];
  check: boolean =  false
  
  constructor(private postService: PostService) { }
  ngOnInit(): void {
    this.getSubsPosts();
  }
  getSubsPosts() {
    this.postService.getSubscriptionsPost("").subscribe((posts) =>  {

      this.posts = this.postService.createPostSubItem(posts)
      this.check = true;

      console.log(this.posts)
    });
  }
  dataSearchHandler(data : any) {

    this.check = false;
    this.posts = this.postService.createPostSubItem(data)
    this.check = true;

    console.log(data)
  }  
}
