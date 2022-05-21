import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../service/post.service';
import { IPost } from '../models/post.model';



@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})

export class SavedComponent {

  posts: IPost[] = [];
  
  constructor(private postService: PostService) { }
  ngOnInit(): void {
    this.getPosts();
  }
  
  getPosts() {
    let user = this.postService.getUserFromLocalStorge();

    this.postService.getSavedPost(user.id).subscribe((posts) =>  {
      this.posts = posts

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
    });
  }
  private diffDays(dateFirst: Date, dateLast: Date): number {

    const timeDiff : number = Math.abs(dateFirst.getTime() - dateLast.getTime());
    const diffDays : number = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    
    return diffDays;
  }
}
