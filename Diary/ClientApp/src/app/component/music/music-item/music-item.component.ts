import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core'
import { MusicService } from '../../../services/music.service'

import { IMucisModel } from '../../../models/mucis.model'

@Component({
  selector: 'app-music-item',
  templateUrl: './music-item.component.html',
  styleUrls: ['./music-item.component.scss']
})

export class MusicItemComponent implements OnInit {

  constructor(
    private musicService : MusicService
  ) { }

  @Input() mucis: IMucisModel | undefined;
  @Output() mucisChanged: EventEmitter<IMucisModel> = new EventEmitter<IMucisModel>()

  ngOnInit() {

  }
  public play(mucis: IMucisModel) {
    this.mucisChanged.emit(mucis);
  }
  public createPath (serverPath: string | undefined) : any {
    if(serverPath != undefined) {
      let url = this.musicService.createPath('resources/music/' + serverPath)
      return url
    }
  }
}
