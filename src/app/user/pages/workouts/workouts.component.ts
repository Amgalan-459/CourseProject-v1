import { Component } from '@angular/core';
import { TraineeService } from '../../../core/services/trainee.service';
import { WorkoutService } from '../../../core/services/workout.service';
import { TraineeData } from '../../../core/interfaces/trainee-data';
import { WorkoutData } from '../../../core/interfaces/workout-data';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TrainerData } from '../../../core/interfaces/trainer-data';
import { TrainerService } from '../../../core/services/trainer.service';
import { StorageService } from '../../../core/services/storage.service';


@Component({
  selector: 'app-workouts',
  imports: [RouterLink],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.css'
})
export class WorkoutsComponent {
  workouts: WorkoutData[] = [];
  trainee: TraineeData | null = null;
  trainer: TrainerData | null = null;
  isLoggedIn = false;
  isTrainer = false;
  traineeId: number = 0;
  constructor (private httpTrainee: TraineeService, private httpWorkout: WorkoutService, private httpTrainer: TrainerService,
    storageService: StorageService, private activatedRoute: ActivatedRoute) {
    if (storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      if (storageService.getIsTrainer()){
        this.isTrainer = true
        this.trainer = storageService.getUser() as TrainerData
        this.traineeId = Number(localStorage.getItem('traineeId')!);
        this.httpWorkout.getWorkoutsByTraineeId(this.traineeId).then(res => this.workouts = res);
        this.httpTrainee.getTraineeById(this.traineeId).then(res => this.trainee = res);
      }
      else {        
        this.trainee = storageService.getUser()! as TraineeData
        this.httpWorkout.getWorkoutsByTraineeId(this.trainee.id).then(res => this.workouts = res);
      }
    }
    else {
      window.location.replace("/auth/logIn");
    }
  }


}
