import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../../service/post.service';
import { IPost } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})

export class PostDetailsComponent {

  post: IPost | undefined
  
  constructor (
    private postService: PostService,
    private route: ActivatedRoute,
  ) { 

  }
  ngOnInit(): void {
    this.getPost(this.route.snapshot.paramMap.get('id')!);
  }
  
  getPost(id : string) {
    this.postService.getPost(id).subscribe((post) =>  {
      this.post = this.postService.createPostSubItem([post])[0];
      console.log(this.post)
    });
  }
}
