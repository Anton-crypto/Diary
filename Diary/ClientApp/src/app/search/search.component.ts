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

  @Input() posts: IPost[] = [];

  searchSet : Array<any> = [
    {
      name : "Теги",
      value : "",
      isVisibel: false,
    },
    {
      name : "Рейтинг",
      value : "0",
      isVisibel: false,
    },
    {
      name : "Автор",
      value : "",
      isVisibel: false,
    },
    {
      name : "Тип постов",
      value : "",
      isVisibel: false,
    },
    {
      name : "Период времени",
      value : "",
      isVisibel: false,
    },
    {
      name : "Просмотренные посты",
      value : "",
      isVisibel: false,
    },
  ]

  @Output() searchEmit: EventEmitter<any> = new EventEmitter<any>()

  ngOnInit(): void {}

  search () {
    this.searchEmit.emit({
      posts : this.posts
    })
  }
  setRam (event : any) {
    this.searchSet[1].value = event
  }
}
