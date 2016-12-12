import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { HttpModule, JsonpModule } from '@angular/http';
import { AngularFireModule, AuthMethods, AuthProviders } from "angularfire2";

import { routes} from '../routes';
import { AppComponent } from './app.component';
import { HomeComponent } from '../home';
import { CreatePlayerComponent } from '../player';
import { CreatePlayerFormComponent } from "../player";
import { ShowPlayerStatsComponent } from '../player';
import { PlayerService } from '../player';
import { ApiService } from '../../core/api';

import '../common/styles.scss';

const firebaseConfig = {
    apiKey: "AIzaSyCpD1w47ngEvJre1yaUHVVepeZMoRIruwc",
    authDomain: "eloworld-bperreault.firebaseapp.com",
    databaseURL: "https://eloworld-bperreault.firebaseio.com",
    storageBucket: "eloworld-bperreault.appspot.com",
    messagingSenderId: "252692585087"
};
@NgModule({
    declarations: [AppComponent, HomeComponent, CreatePlayerComponent, ShowPlayerStatsComponent, CreatePlayerFormComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        MaterialModule.forRoot(),
        HttpModule,
        JsonpModule,
        AngularFireModule.initializeApp(firebaseConfig,{
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
    })
    ],
    bootstrap: [AppComponent],
    providers: [ApiService, PlayerService]
})
export class AppModule { }
