import { Component, Inject } from '@angular/core'

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent {
  items : Author[] = [
    {
      name: "Anton",
      time: new Date(123123123).toLocaleTimeString(),
    },
    {
      name: "Danil",
      time: new Date(123123123).toLocaleTimeString(),
    },
  ]
  addItem(name: string, time: string): void {
    if (
      name == null || name.trim() == '' || 
      time == null
    ) return ;

    this.items.push(new Author(name, time))
  }
}

class Author {
  name : string
  time : string
  
  constructor(@Inject(String)name: string, @Inject(String)time: string) {
    this.name = name
    this.time = time

  }   
}