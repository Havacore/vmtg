import { Component, OnInit } from '@angular/core';

import {PlayerService} from "./Player.service";
import {Player} from "../../models";

@Component({
  selector: 'show-player',
  template: `
    <h2>Logged in player: {{ loggedInPlayer.firstName }}</h2>
  `
})

export class ShowPlayerStatsComponent implements OnInit {

    private loggedInPlayer: Player;

    constructor(private playerService: PlayerService) {}

    ngOnInit() {
        this.loggedInPlayer = this.playerService.getPlayer();
    }


}
