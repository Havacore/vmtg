import { Injectable } from "@angular/core";
import { Player } from "../../models";

@Injectable()
export class PlayerService {

    private static getPlayerUrl: string = "/api/v1/players";
    private player: Player = {firstName: "Jason", lastName: "Dahl", eloScore: 0, email: "jdahl@vendasta.com"};

    getPlayer(): Player {
        return this.player;
    }
}