import { Component } from '@angular/core';

@Component({
  selector: 'show-player',
  template: `
    <h2>Logged in player: {{ loggedInPlayer }}</h2>
  `
})

export class ShowPlayerStatsComponent {

    private loggedInPlayer = "Jason";
}
