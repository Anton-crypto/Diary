import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../service/post.service';
import { IPost } from '../models/post.model';


@Component({
  selector: 'app-time-line',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})

export class TimeLineComponent {

  posts: IPost[] = [];
  check: boolean =  false
  
  constructor(private postService: PostService) { }
  ngOnInit(): void {
    this.getPosts();
  }
  
  getPosts() {
    this.postService.getPosts().subscribe((posts) =>  {

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
