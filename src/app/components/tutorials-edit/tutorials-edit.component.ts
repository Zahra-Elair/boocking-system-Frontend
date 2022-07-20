import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-edit',
  templateUrl: './tutorials-edit.component.html',
  styleUrls: ['./tutorials-edit.component.scss'],
})
export class TutorialsEditComponent implements OnInit {
  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
  };
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getTutorial(this.route.snapshot.params.id);
  }
  
  getTutorial(id: string): void {
    this.tutorialService.get(id).subscribe(
      (data) => {
        this.tutorial = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description,
      published: status,
    };

    this.tutorialService.update(this.tutorial.id, data).subscribe(
      (response) => {
        this.tutorial.published = status;
        console.log(response);
        this.message = 'Update status success!';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateTutorial(): void {
    this.tutorialService
      .update(this.tutorial.id, this.tutorial)
      .subscribe(
        (response) => {
          console.log(response);
          this.message = 'Update tutorial success!';
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.tutorial.id).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/tutorials']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
