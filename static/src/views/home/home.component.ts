import { Component } from '@angular/core';

@Component({
  selector: 'home',
  template: `
    <button md-raised-button color="accent" [routerLink]="['/player/show']">Player Stats</button >
    <button md-raised-button color="accent" [routerLink]="['/player/create']">Create Player</button>
  `,
  styles: []
})

export class HomeComponent {
}
