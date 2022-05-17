import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../../service/post.service';
import { IComment } from '../../models/sub-post/comment.model';
import { IPost } from 'src/app/models/post.model'; 
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent {

  constructor(private postService: PostService) { }
  

  @Input() post: IPost | undefined;
  
  text : string = ""
  user : IUser | undefined = undefined

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("userExtendedModel")!);

    this.post!.comments.forEach(comment => {
      comment!.timePost = this.postService.diffDays(new Date(comment!.timePost as Date), new Date())
    });
  }
  
  addComment() {

    if(this.post == undefined) return;
    if(this.user == undefined) return;

    let comment : IComment = {
      text : this.text, 
      postid : this.post.id.toString(),
      userid : this.user.id,
    }

    this.postService.addComment(comment).subscribe(((comment) => { 
      this.post!.comments.push(comment) ; 
      this.text = ""; 
    }));
  }
  public createImgPath = (serverPath: string) => this.postService.createImgPath(serverPath);

}
