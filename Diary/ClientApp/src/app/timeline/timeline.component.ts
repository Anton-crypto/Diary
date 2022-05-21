import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../service/post.service';
import { IPost } from '../models/post.model';



@Component({
  selector: 'app-time-line',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})

export class TimeLineComponent {

  posts: IPost[] = [];
  
  constructor(private postService: PostService) { }
  ngOnInit(): void {
    this.getPosts();
  }
  
  getPosts() {
    this.postService.getPosts().subscribe((posts) =>  {
      this.posts = posts
      let user = JSON.parse(localStorage.getItem("user")!);
      this.posts.forEach(post => {

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

        post.isAccessories = user.email == post.user.email ?  true : false;
      });


      console.log(this.posts)
    });
  }
  dataSearchHandler(data : any) {
    console.log(data)
  }  
  private diffDays(dateFirst: Date, dateLast: Date): number {

    const timeDiff : number = Math.abs(dateFirst.getTime() - dateLast.getTime());
    const diffDays : number = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    
    return diffDays;
  }
}
