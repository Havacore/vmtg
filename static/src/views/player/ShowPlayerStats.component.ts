import { Component, OnInit } from '@angular/core';

import {PlayerService} from "./Player.service";
import {Player} from "../../models";

@Component({
  selector: 'show-player',
  template: `
    <h1>Planeswalker: {{ loggedInPlayer?.firstName }} {{ loggedInPlayer?.lastName }}</h1>
    <h2>Elo: {{loggedInPlayer?.eloScore}}</h2>
  `
})

export class ShowPlayerStatsComponent implements OnInit {

    private loggedInPlayer: Player;
    private errorMessage: any;

    constructor(private playerService: PlayerService) {}

    ngOnInit() {
        this.playerService.getPlayer("jdahl@vendasta.com").subscribe(
            player => {
                this.loggedInPlayer = player;
                console.log(this.loggedInPlayer);
            },
            error => {
                this.errorMessage = <any>error;
            }
        );
    }


}
