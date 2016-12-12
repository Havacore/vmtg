import { Component } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';

@Component({
  selector: 'home',
  template: `
    <button md-raised-button color="primary" (click)="signIn()">Sign In</button >
    <button md-raised-button color="accent" [routerLink]="['/player/show']">Player Stats</button >
    <button md-raised-button color="accent" [routerLink]="['/player/create']">Create Player</button>
  `,
  styles: []
})

export class HomeComponent {

    private user: any;

    constructor(public af: AngularFire) {
        this.af.auth.subscribe(user => {
            if(user) {
                // user logged in
                this.user = user;
            }
            else {
                // user not logged in
                this.user = {};
            }
        });
    }

    private signIn() {
        this.af.auth.login({provider: AuthProviders.Google});
        console.log(this.user)
    }

    private signOut() {
        this.af.auth.logout();
    }
}
