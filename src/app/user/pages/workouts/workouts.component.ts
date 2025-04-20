import { Component } from '@angular/core';
import { TraineeService } from '../../../core/services/trainee.service';
import { WorkoutService } from '../../../core/services/workout.service';
import { TraineeData } from '../../../core/interfaces/trainee-data';
import { WorkoutData } from '../../../core/interfaces/workout-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-workouts',
  imports: [RouterLink],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.css'
})
export class WorkoutsComponent {
  trainee: TraineeData | null = null;
  workouts: WorkoutData[] = [];
  constructor (private httpTrainee: TraineeService, private httpWorkout: WorkoutService) {
    this.httpTrainee.getTraineeById(1).then(res => {
      this.trainee = res
      this.httpWorkout.getWorkoutsByTraineeId(res.id).then(res => this.workouts = res);
    });

    
  }


}
