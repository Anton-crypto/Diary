import { Component, Inject, Input, ViewChild, ElementRef } from '@angular/core'
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

  @ViewChild('observer') paginatioObserv: ElementRef | undefined;
  
  constructor(
    private postService: PostService,
  ) { }
  ngOnInit(): void {
    //this.getPosts();
    this.getPostsPagination(String(this.countTime));
  }
  ngAfterViewInit(): void {
    if(this.paginatioObserv) {

      const options = {
        rootMargin: '0px',
        threshold: 1.0
      }

      let callback = (entries: any, observer : any) => {
        if(entries[0].isIntersecting) {
          this.getPostsPagination(String(this.countTime));
        }
      }

      const observers = new IntersectionObserver(callback, options)
      observers.observe(this.paginatioObserv.nativeElement)
    }
  }
  getPosts() {
    this.postService.getPosts().subscribe({
      next: (posts) => {

        this.posts = this.postService.createPostSubItem(posts)
        this.check = true;
  
      },
      error: () => {
        this.check = true;
      }
    });
  }
  getPostsPagination(count: string) {
    this.postService.getPostsPagination(count).subscribe({
      next: (posts) => {

        let p = this.postService.createPostSubItem(posts)

        p.forEach(post => {
          this.posts.push(post);
        });
  
        this.check = true;
        this.countTime++;
  
      },
      error: () => {
        this.check = true;
      }
    });
  }
  dataSearchHandler(data : any) {

    this.check = false;
    this.posts = this.postService.createPostSubItem(data)
    this.check = true;

    console.log(data)
  }  
}
