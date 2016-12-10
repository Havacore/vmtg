import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { routes} from '../routes';
import { AppComponent } from './app.component';
import { HomeComponent } from '../home';
import { CreatePlayerComponent } from '../player';
import { ShowPlayerStatsComponent } from '../player';
import { ApiService } from '../../core/api';

import '../common/styles.scss';

@NgModule({
    declarations: [AppComponent, HomeComponent, CreatePlayerComponent, ShowPlayerStatsComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        MaterialModule.forRoot()
    ],
    bootstrap: [AppComponent],
    providers: [ApiService]
})
export class AppModule { }
