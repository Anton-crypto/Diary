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
      console.log(post)
      this.post = post

      const time = this.diffDays(new Date(post.timePost), new Date());
      post.timePost = ` ${time} дня назад`;

      let item : any [] = [] 

      if(post.postImages != undefined && post.postImages.length > 0) 
        item.push(...post.postImages)
      if(post.postTexts != undefined && post.postTexts.length > 0) 
        item.push(...post.postTexts)
      if(post.postVidio != undefined && post.postVidio.length > 0) 
        item.push(...post.postVidio)

      item.sort((a, b) => a.displayNumber > b.displayNumber ? 1 : -1);
      post.postItem = item

      console.log(this.post)
      console.log("sdfsdfsdf")
    });
  }
  private diffDays(dateFirst: Date, dateLast: Date): number {

    const timeDiff : number = Math.abs(dateFirst.getTime() - dateLast.getTime());
    const diffDays : number = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    
    return diffDays;
  }
}
