import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core'
import { UserService } from '../service/user.service';
import { IUser } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../models/post.model';
import { PostService } from '../service/post.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit{

  constructor (
    private userService: UserService,
    private route: ActivatedRoute,
    private postService: PostService,
  ){ }

  posts: IPost[] = [];
  
  @Input() searchSet : any
  @Output() searchEmit: EventEmitter<any> = new EventEmitter<any>()

  ngOnInit(): void {}
  
  search () {
    this.searchEmit.emit({
      posts : this.posts
    })
  }
}
