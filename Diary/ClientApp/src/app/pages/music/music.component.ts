import { Component, OnInit} from '@angular/core'
import { MusicService } from "../../services/music.service"

import { IMucisModel } from "../../models/mucis.model"

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})

export class MusicComponent implements OnInit {

  constructor(
    public musicService: MusicService,
  ) { }

  mucises: IMucisModel[] | undefined
  mucisPlay: IMucisModel | undefined

  ngOnInit() {
    this.getMucis();
  }

  playMucis(mucisPlay: IMucisModel) {
    this.mucisPlay = mucisPlay;
  }
  getMucis() {
    this.musicService.getMucis().subscribe({
      next: (mucis: IMucisModel[]) => {
        this.mucises = mucis
      },
      error: () => {

      },
    })
  }
}
