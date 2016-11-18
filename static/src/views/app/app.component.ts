import { Component } from '@angular/core';


@Component({
  selector: 'app',
  template: `
  <md-sidenav-layout fullscreen>
      <md-sidenav #sidenav class="app-sidenav">
        <a md-button [routerLink]="['/']" (click)="sidenav.close()">Home</a><br>
        <a md-button [routerLink]="['/projects']" (click)="sidenav.close()">Projects</a><br>
        <button md-button #closeStartButton (click)="sidenav.close()">Close</button>
      </md-sidenav>

      <md-toolbar color="primary">
        <button class="app-icon-button" (click)="sidenav.toggle()">
          <i class="material-icons app-toolbar-menu">menu</i>
        </button>
        Angular 2 Seed Application
      </md-toolbar>

      <main class="app-content">
        <md-card>
        <router-outlet></router-outlet>
        </md-card>
      </main>

    </md-sidenav-layout>  
  `,
  styles: [`
.app-content {
  padding: 20px;
}

.app-content md-card {
  margin: 20px;
}

.app-sidenav {
  padding: 12px 8px 52px;
}

.app-toolbar-menu {
  padding: 0 14px 0 14px;
  color: white;
}

.app-icon-button {
  box-shadow: none;
  user-select: none;
  background: none;
  border: none;
  cursor: pointer;
  filter: none;
  font-weight: normal;
  height: auto;
  line-height: inherit;
  margin: 0;
  min-width: 0;
  padding: 0;
  text-align: left;
  text-decoration: none;
}`
  ]
})

export class AppComponent { }
