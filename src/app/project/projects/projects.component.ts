import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProjectService } from '../project.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ProjectService, DecimalPipe],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  page = 1;
  pageSize = 10;
  collectionSize = 30;
  projects: Project[];

  destroy = new Subject();

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService
      .sendGetRequest({ page: this.page, pageSize: this.pageSize })
      .pipe(takeUntil(this.destroy))
      .subscribe((res: HttpResponse<any>) => {
        // console.log(res);
        this.projects = res.body;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  refreshProjects(): void {
    this.projectService
      .sendGetRequest({ page: this.page, pageSize: this.pageSize })
      .pipe(takeUntil(this.destroy))
      .subscribe((res: HttpResponse<any>) => {
        // console.log(res);
        this.projects = res.body;
      });
  }

  public firstPage() {
    this.projects = [];
    this.projectService
      .sendGetRequestToUrl(this.projectService.first)
      .pipe(takeUntil(this.destroy))
      .subscribe((res: HttpResponse<any>) => {
        // console.log(res);
        this.projects = res.body;
      });
  }

  public previousPage() {
    if (
      this.projectService.prev !== undefined &&
      this.projectService.prev !== ''
    ) {
      this.projects = [];
      this.projectService
        .sendGetRequestToUrl(this.projectService.prev)
        .pipe(takeUntil(this.destroy))
        .subscribe((res: HttpResponse<any>) => {
          // console.log(res);
          this.projects = res.body;
        });
    }
  }

  public nextPage() {
    if (
      this.projectService.next !== undefined &&
      this.projectService.next !== ''
    ) {
      this.projects = [];
      this.projectService
        .sendGetRequestToUrl(this.projectService.next)
        .pipe(takeUntil(this.destroy))
        .subscribe((res: HttpResponse<any>) => {
          // console.log(res);
          this.projects = res.body;
        });
    }
  }

  public lastPage() {
    this.projects = [];
    this.projectService
      .sendGetRequestToUrl(this.projectService.last)
      .pipe(takeUntil(this.destroy))
      .subscribe((res: HttpResponse<any>) => {
        // console.log(res);
        this.projects = res.body;
      });
  }
}
