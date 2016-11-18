import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'project-list',
  styles: [
    `.project {
      color: #0c0;
    }`
  ],
  template: `<h2>Projects</h2>

    <ul>
      <li class="project" *ngFor="let project of projects | async">{{project.name}}</li>
    </ul>
    `
})

export class ProjectListComponent {
  @Input() projects: any;
}
