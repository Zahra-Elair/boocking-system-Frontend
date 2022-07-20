import { Component } from '@angular/core';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss'],
})
export class ProjectAddComponent {
  project: Project = {
    projectName: '',
    description: '',
    status: 0,
    clientCompany: '',
    projectLeader: '',
    estimatedBudget: 0,
    spentBudget: 0,
    estimatedDuration: 0,
  };

  constructor(private projectService: ProjectService) {}

  saveProject(): void {}
}
