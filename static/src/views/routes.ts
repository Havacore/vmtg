import { Routes }  from '@angular/router';

import { HomeComponent } from './home';
import { CreatePlayerComponent } from './player';
import { ShowPlayerStatsComponent } from './player';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'player/create', component: CreatePlayerComponent},
  {path: 'player/show', component: ShowPlayerStatsComponent},
  {path: '**', redirectTo: ''}
];
