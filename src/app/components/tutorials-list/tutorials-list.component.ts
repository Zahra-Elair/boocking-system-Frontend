import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.scss'],
})
export class TutorialsListComponent implements OnInit {
  page = 1;
  pageSize = 10;
  collectionSize = 300;
  tutorials?: Tutorial[];
  title = '';

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.retrieveTutorials({ page: this.page, pageSize: this.pageSize });
  }

  retrieveTutorials(params: any): void {
    this.tutorialService.getAll(params).subscribe(
      (data) => {
        this.tutorials = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteAllTutorials(): void {
    this.tutorialService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteTutorial(id: string): void {
    this.tutorialService.delete(id).subscribe(
      (response) => {
        console.log(response);
        this.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchByTitle(): void {
    this.tutorialService
      .findByTitle({
        title: this.title,
        page: this.page,
        pageSize: this.pageSize,
      })
      .subscribe(
        (data) => {
          this.tutorials = data;
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
