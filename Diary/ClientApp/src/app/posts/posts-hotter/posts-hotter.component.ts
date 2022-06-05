import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../../service/post.service';
import { IPost } from '../../models/post.model';


@Component({
  selector: 'app-posts-hotter',
  templateUrl: './posts-hotter.component.html',
  styleUrls: ['./posts-hotter.component.scss']
})

export class PostsHotterComponent {

  posts: IPost[] = [];
  check: boolean =  false
  
  constructor(private postService: PostService) { }
  ngOnInit(): void {
    this.getHotters();
  }
  
  getHotters() {
    this.postService.getHotPost().subscribe((posts) =>  {

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
