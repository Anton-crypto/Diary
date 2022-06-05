import { Component, OnInit } from '@angular/core'
import { PostService } from '../../service/post.service';
import { IPost } from '../../models/post.model';

@Component({
  selector: 'app-posts-best',
  templateUrl: './posts-best.component.html',
  styleUrls: ['./posts-best.component.scss']
})

export class PostsBestComponent implements OnInit {

  posts: IPost[] = [];
  check: boolean =  false
  
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getBests();
  }

  getBests() {
    this.postService.getBestPost().subscribe((posts) =>  {

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
