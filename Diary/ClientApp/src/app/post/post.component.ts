import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../service/post.service';
import { IPost } from '../models/post.model';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent {

  constructor(private postService: PostService) { }
  @Input() post: IPost | undefined;

  ngOnInit(): void { }
  public createImgPath = (serverPath: string) => this.postService.createImgPath(serverPath);
}
