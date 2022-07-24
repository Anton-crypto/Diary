import { Component, OnInit, Input} from '@angular/core'
import { MusicService } from '../../../services/music.service'

import { IMucisModel } from '../../../models/mucis.model'

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-music-menu',
  templateUrl: './music-menu.component.html',
  styleUrls: ['./music-menu.component.scss']
})

export class MusicMenuComponent implements OnInit {

  constructor(
    private musicService : MusicService
  ) { }

  @Input() mucis: IMucisModel | undefined;

  ngOnInit() {

  }
  ngDoCheck() {
    console.log("next");
  }

  public createPath (serverPath: string | undefined) : any {
    if(serverPath != undefined) {
      let url = this.musicService.createPath('resources/music/' + serverPath)
      return url
    }
  }
}
