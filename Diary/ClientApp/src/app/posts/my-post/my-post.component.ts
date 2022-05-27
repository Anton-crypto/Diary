import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../../service/post.service';
import { IPost } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})

export class MyPostComponent {

  posts: IPost[] = []
  uderId: string | undefined = ""
  check: boolean =  false
  
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.uderId = this.route.snapshot.paramMap.get('id')?.toString();

    if(this.uderId != undefined) {
      this.getPosts(this.uderId);
    }
  }
  
  getPosts(id : string) {
    this.postService.getMyPosts(id).subscribe((posts) =>  {
      this.posts = this.postService.createPostSubItem(posts);

      setTimeout(() => {this.check = true;}, 1000)
    });
  }
}
