import { Component, OnInit } from '@angular/core';

import {PlayerService} from "./Player.service";
import {Player} from "../../models";

@Component({
  selector: 'show-player',
  template: `
    <h2>Logged in player: {{ loggedInPlayer?.firstName |async }}</h2>
  `
})

export class ShowPlayerStatsComponent implements OnInit {

    private loggedInPlayer: Player;
    private errorMessage: any;

    constructor(private playerService: PlayerService) {}

    ngOnInit() {
        this.playerService.getPlayer("jdahl@vendasta.com").subscribe(
            player => this.loggedInPlayer = player,
            error => this.errorMessage = <any>error
        );
    }


}
