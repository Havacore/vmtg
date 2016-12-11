import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';

import { Player } from '../../models';

@Injectable()
export class PlayerService {

    private static scheme: string = 'http://';
    private static hostUrl: string = 'localhost:8080';
    private static playerUrl: string = '/api/v1/players/';
    private player: Player = {firstName: 'Jason', lastName: 'Dahl', eloScore: 0, email: 'jdahl@vendasta.com'};

    constructor(private http: Http) {}

    getPlayer(playerEmail: string): Observable<Player> {
        let url = PlayerService.scheme + PlayerService.hostUrl + PlayerService.playerUrl + '?email=' + playerEmail;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createPlayer(player: Player): Observable<Player> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let url = PlayerService.scheme + PlayerService.hostUrl + PlayerService.playerUrl;

        return this.http.put(url, JSON.stringify(player), options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body: Player;
        if (response.text()) {
            body = response.json();
        }
        return body || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}