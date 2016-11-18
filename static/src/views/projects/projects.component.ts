import { Component } from '@angular/core';
import { ProjectService } from '../../core/projects';


@Component({
  selector: 'projects',
  template: `
    <project-list [projects]="projectService.projects"></project-list>
  `
})

export class ProjectsComponent {
  constructor(public projectService: ProjectService) {}
}
