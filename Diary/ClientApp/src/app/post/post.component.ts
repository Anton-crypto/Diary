import { Component, Inject } from '@angular/core'
import { PostService } from './post.service';
import { IPost } from '../models/post.model';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent {

  constructor(private postService: PostService) { }
  posts: IPost[] = [];

  ngOnInit(): void {
    this.getPosts();
    console.log("post")
  }
  
  getPosts() {
    this.postService.getPosts().subscribe((posts) =>  {
      this.posts = posts
      console.log(posts)
      this.posts.forEach(post => {
        const time = this.diffDays(new Date(post.timePost), new Date());
        post.timePost = ` ${time} дня назад`;
      });
    });
  }

  private diffDays(dateFirst: Date, dateLast: Date): number {

    const timeDiff : number = Math.abs(dateFirst.getTime() - dateLast.getTime());
    const diffDays : number = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    
    return diffDays;
  }
}
