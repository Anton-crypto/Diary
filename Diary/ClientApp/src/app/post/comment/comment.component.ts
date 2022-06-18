import { Component, Input, Output, EventEmitter} from '@angular/core'

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
  @Output() commentCount = new EventEmitter<number>();
  
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

  getCommentCount() {
    this.commentCount.emit(this.comments.length);
  }
  
  getAll(id: string) {
    this.commentService.getAll(id).subscribe({
      next: (comments: IComment[]) => {
        if(comments) {
          comments.forEach(comment => {
            this.getUser(comment)
          });
          
          this.comments = this.comments.sort((a : any, b: any) => {
            console.log(new Date(a?.comment.timePost) > new Date(a?.comment?.timePost))
            if (new Date(a?.comment.timePost) > new Date(a?.comment?.timePost)) {
              return 1;
            }
            if (new Date(a?.comment.timePost) < new Date(a?.comment?.timePost)) {
              return -1;
            }
            return 0;
          });

          console.log(comments);
        }
      },
      error: () => {

      },
      complete: () => {
      }
    })
  }
  getUser(comment: IComment) {
    this.userService.getUser(comment.userID!).subscribe({
      next: (user) => {
        this.addItemAndSort({comment: comment, user: user}, this.comments);
        this.getCommentCount();
      },
    })
  }
  private addItemAndSort(item: {comment: IComment, user: IUser}, array: Array<any>) {

    let massIndex : number = -1;

    for (let index = array.length-1; index >= 0; index--) {
      const massItem = array[index];

      if(new Date(massItem.comment.timePost).getTime() > new Date(item.comment.timePost!).getTime()) {
        massIndex = index
      } else if(new Date(massItem.comment.timePost).getTime() == new Date(item.comment.timePost!).getTime()) {
        massIndex = index
      }
    }
    if(massIndex !== -1) {
      array.splice(massIndex, 0, item);
      return;
    }
    
    array.push(item)
  }
  openUpdateCommentInput(comment: IComment) {
    if(this.userRole == 'user'&& comment?.userID == this.user?.id && this.user!.isBan != true) {
      this.commentUpdate = comment
      this.textUpdate = comment.text!
    }
  }
  closeUpdateCommentInput () {
    this.commentUpdate = undefined
    this.textUpdate = ""
  }

  addComment() {

    if(this.post == undefined) return;
    if(this.user == undefined) return;
    if(this.text == "") return;

    let comment : IComment = {
      text : this.text, 
      postid : this.post.id.toString(),
      userID : this.user.id,
    }

    this.postService.addComment(comment).subscribe(((comment) => { 
      this.comments.push({comment: comment, user: this.user! }) ; 
      this.text = ""; 

      this.getCommentCount();
    }));
  }
  updateComment(comment: IComment) {

    if(this.textUpdate  == "") return;
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

        this.getCommentCount();
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

        this.getCommentCount();
      },
      error : () => { }
    })
  }
  public createImgPath = (serverPath: string) => this.postService.createImgPath(serverPath);

}
