import { Component, Inject, Input } from '@angular/core'
import { PostService } from '../service/post.service';
import { IPost } from '../models/post.model';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})

export class SubscriptionsComponent {

  posts: IPost[] = []
  uderId: string | undefined = ""
  
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
    let user = this.postService.getUserFromLocalStorge();

    this.postService.getPostSubscriptions(id).subscribe((posts) =>  {
      this.posts = posts

      this.posts.forEach(post => {

        const time = this.postService.diffDays(new Date(post.timePost), new Date());
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
}
