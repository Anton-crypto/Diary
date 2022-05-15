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
  
  constructor(private postService: PostService) { }
  ngOnInit(): void {
    this.getPosts();
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
