import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../../service/post.service';
import { IComment } from '../../models/sub-post/comment.model';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent {

  constructor(private postService: PostService) { }
  
  @Input() commens: IComment [] | undefined;
  text : string = ""

  ngOnInit(): void {
 
  }
  public createImgPath = (serverPath: string) => this.postService.createImgPath(serverPath);
}
