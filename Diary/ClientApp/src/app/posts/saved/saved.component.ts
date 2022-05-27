import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../../service/post.service';
import { IPost } from '../../models/post.model';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})

export class SavedComponent {

  posts: IPost[] = [];
  check: boolean =  false
  
  constructor(private postService: PostService) { }
  ngOnInit(): void {
    this.getPosts();
  }
  
  getPosts() {
    let user = this.postService.getUserFromLocalStorge();

    this.postService.getSavedPost(user.id).subscribe((posts) =>  {
      this.posts = this.postService.createPostSubItem(posts);
      setTimeout(() => {this.check = true;}, 1000)
    });
  }
}
