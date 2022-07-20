import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-details',
  templateUrl: './tutorials-details.component.html',
  styleUrls: ['./tutorials-details.component.scss'],
})
export class TutorialsDetailsComponent implements OnInit {
  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
  };

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
}
