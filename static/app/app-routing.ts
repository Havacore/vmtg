import { NgModule } from '@angular/core';

import { Routes, RouterModule }  from '@angular/router';

import { HomeComponent } from './views/home';
import { CreatePlayerComponent } from './views/player';
import { ShowPlayerStatsComponent } from './views/player';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'player/create', component: CreatePlayerComponent},
    {path: 'player/show', component: ShowPlayerStatsComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
