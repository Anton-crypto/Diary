import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../../service/post.service';
import { IPost } from '../../models/post.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-time-line',
  templateUrl: './posts-time.component.html',
  styleUrls: ['./posts-time.component.scss']
})

export class TimeLineComponent {

  posts: IPost[] = [];
  check: boolean =  false

  countTime: number= 0;
  
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    //this.getPosts();

    this.getPostsPagination(String(this.countTime));

    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        this.getPostsPagination(String(this.countTime));
      }
    });
  }
  getPosts() {
    this.postService.getPosts().subscribe((posts) =>  {

      this.posts = this.postService.createPostSubItem(posts)
      this.check = true;

      console.log(this.posts)
    });
  }
  getPostsPagination(count: string) {
    this.postService.getPostsPagination(count).subscribe((posts) =>  {

      let p = this.postService.createPostSubItem(posts)

      p.forEach(post => {
        this.posts.push(post);
      });

      this.check = true;
      this.countTime++;

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
