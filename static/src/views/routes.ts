import { Routes }  from '@angular/router';

import { HomeComponent } from './home';
import { ProjectsComponent } from './projects';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: '**', redirectTo: ''}
];
