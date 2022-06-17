import { Component, Input } from '@angular/core'

import { PostService } from '../../service/post.service';
import { UserService } from 'src/app/service/user.service';

import { IComment } from '../../models/sub-post/comment.model';
import { IPost } from 'src/app/models/post.model'; 
import { IUser } from 'src/app/models/user.model';

import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent {

  constructor(
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
  ) { }
  

  @Input() post: IPost | undefined;
  
  text : string = ""
  textUpdate : string = ""

  user : IUser | undefined = undefined
  userRole : string = ""

  comments : [{comment: IComment, user: IUser}?] = []

  commentUpdate : IComment | undefined

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorge();
    this.userRole = this.postService.getRout();

    if(this.post) this.getAll(this.post.id);

  }
  
  getAll(id: string) {
    this.commentService.getAll(id).subscribe({
      next: (comments: IComment[]) => {
        if(comments) {
          comments.forEach(comment => {
            this.getUser(comment)
          });
        }
      },
      error: () => {

      }
    })
  }
  getUser(comment: IComment) {
    console.log(comment)
    this.userService.getUser(comment.userID!).subscribe({
      next: (user) => {
        this.comments.push({comment: comment, user: user})
      }
    })
  }
  addComment() {

    if(this.post == undefined) return;
    if(this.user == undefined) return;

    let comment : IComment = {
      text : this.text, 
      postid : this.post.id.toString(),
      userID : this.user.id,
    }

    this.postService.addComment(comment).subscribe(((comment) => { 
      this.comments.push({comment: comment, user: this.user! }) ; 
      this.text = ""; 
    }));
  }
  chageUpdateComment(comment: IComment) {
    this.commentUpdate = comment
    this.textUpdate = comment.text!
  }
  updateComment(comment: IComment) {

    comment.text = this.textUpdate 
    this.commentService.update(comment).subscribe({
      next: (comment) => {
        this.commentUpdate = undefined
        this.textUpdate = ""
      }
    })
  }
  deleteComment (id: string) {
    this.commentService.delete(id).subscribe({
      next : (comment: IComment) => {

        const index = this.comments!.findIndex(n => n?.comment.id === id);

        if (index !== -1) {
          this.comments!.splice(index, 1);
        }
      },
      error : () => { }
    })
  }
  deleteCommentModer (id: string) {
    this.commentService.deleteModeration(id).subscribe({
      next : (comment: IComment) => {

        const index = this.comments!.findIndex(n => n?.comment.id === id);

        if (index !== -1) {
          this.comments!.splice(index, 1);
        }
      },
      error : () => { }
    })
  }
  public createImgPath = (serverPath: string) => this.postService.createImgPath(serverPath);

}
