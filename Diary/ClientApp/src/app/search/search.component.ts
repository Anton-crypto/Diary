import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core'
import { UserService } from '../service/user.service';
import { ISearch } from '../models/search.model';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../models/post.model';
import { PostService } from '../service/post.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit{

  dateString : string = ""
  date : Date | undefined
  bodySearch : string = ""
  author : string = ""

  searchBody : ISearch = {
    userid : "",
    bodySearch: "",
    tegs : "",
    rating : "",
    nameAuthor : "",
    typePost : "",
    dataType : "",
  }

  constructor (
    private postService: PostService,
  ){ 

    this.dateString =  new Date().toLocaleDateString();
    this.date = new Date()
    this.searchSet[4].types[3].value  = this.dateString; 
  }

  @Input() posts: IPost[] = [];

  searchSet : Array<any> = [
    {
      name : "Теги",
      value : "",
      tegs : [],
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
      types : [
        {
          name: "любые",
          isActive: false,
        },
        {
          name: "текстовые",
          isActive: false,
        },
        {
          name: "картинка",
          isActive: false,
        },
        {
          name: "видео",
          isActive: false,
        },
        {
          name: "[ мое ]",
          isActive: false,
        },
        {
          name: "NSFW",
          isActive: false,
        }
      ]
    },
    {
      name : "Период времени",
      value : "",
      isVisibel: false,
      types : [
        {
          name: "за все время",
          isActive: true,
          value : "max"
        },
        {
          name: "неделя",
          isActive: false,
          value : "7"
        },
        {
          name: "месяц",
          isActive: false,
          value : "30"
        },
        {
          name: "задать даты",
          isActive: false,
          value : ""
        },
      ]
    },
  ]

  @Output() searchEmit: EventEmitter<any> = new EventEmitter<any>()

  ngOnInit(): void {}

  search () {
    this.searchEmit.emit({
      posts : this.posts
    })
  }
  serAuthorName(event : any) {
    console.log(event.target.value)
  }
  setRam (event : any) {
    this.searchSet[1].value = event
    this.searchBody.rating = event
  }
  addTeg (event : any) {
    if(event.keyCode !== 13 ) return;
    if(this.searchSet[0].value.length == 0) return;

    this.searchSet[0].tegs.push(this.searchSet[0].value)
    this.searchSet[0].value = ""
  }
  deleteTeg (index : any) {
    this.searchSet[0].tegs.splice(index, 1);
  }
  activeTypePost(index: number) {
    let item = this.searchSet[3].types[index];

    if(item.name == "любые" && item.isActive == false) {
      this.searchSet[3].types.forEach((element : any) => {
        element.isActive = false;
      });
    } 
    if(item.name != "любые") {
      this.searchSet[3].types[0].isActive = false;
    } 

    item.isActive = !item.isActive;
  }
  getClassForButtonsType(isActive : boolean ) : string {
    if(isActive == true) {
      return "activeType"
    }
    return ""
  }
  setDateRange(index: number) {
    this.searchSet[4].types[index].isActive = true;
    this.searchBody.dataType = this.searchSet[4].types[index].name // ISearch

    this.searchSet[4].types.forEach((element : any , indexFor : number) => {
      if(indexFor == index) return;
      element.isActive = false;
    });
  }
  setDate(event : any) {
    this.dateString = new Date(event.target.valueAsDate).toLocaleDateString()

    this.searchSet[4].types[3].isActive = true;
    this.searchSet[4].types[3].value = this.dateString; 
    this.searchBody.dataType = this.dateString; // ISearch

    this.searchSet[4].types.forEach((element : any , indexFor : number) => {
      if(indexFor == 3) return;
      element.isActive = false;
    });
  }

  getPostForSearch() {
    this.searchBody.bodySearch = this.bodySearch
    this.searchBody.nameAuthor = this.author
    this.searchBody.tegs = ""
    this.searchBody.typePost = ""
    this.searchBody.dataType = ""

    this.searchSet[3].types.forEach((element : any) => {
      if(element.isActive) {
        this.searchBody.typePost += element.name + ","
      }
    });

    this.searchSet[4].types.forEach((element : any) => {
      if(element.isActive) {
        this.searchBody.dataType = element.value
      }
    });

    this.searchSet[0].tegs.forEach((element : any) => {
      this.searchBody.tegs += element + ","
    });

    console.log(this.searchBody)

    this.postService.getPostsForSearch(this.searchBody).subscribe((posts) => {
      this.posts = posts;
      this.searchEmit.emit(this.posts)
    });
  }
}
