import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../../service/post.service';
import { IPost } from '../../models/post.model';


@Component({
  selector: 'app-posts-moder',
  templateUrl: './posts-moder.component.html',
  styleUrls: ['./posts-moder.component.scss']
})

export class PostsModerComponent {

  posts: IPost[] = [];
  check: boolean =  false
  
  constructor(private postService: PostService) { }
  ngOnInit(): void {
    this.getPosts();
  }
  
  getPosts() {
    this.postService.getPostModer().subscribe((posts) =>  {

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
