import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TraineeService } from './core/services/trainee.service';
import { TraineeData } from './core/interfaces/trainee-data';
import { TrainerService } from './core/services/trainer.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CourseProject-v1';
  trainee: TraineeData | null = null;

  constructor(private traineeService: TraineeService, private trainerService: TrainerService) {
    traineeService.getAllTrainees().then(res => {
      console.log(res);
      this.trainee = res[0];

      trainerService.getTrainerById(this.trainee.trainerId).then(res => {
        console.log(res);
      })
    });
  }
}
