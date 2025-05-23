import { Component } from '@angular/core';
import { TraineeService } from '../../../core/services/trainee.service';
import { TraineeData } from '../../../core/interfaces/trainee-data';
import { TrainerData } from '../../../core/interfaces/trainer-data';
import { WorkoutService } from '../../../core/services/workout.service';
import { TrainerService } from '../../../core/services/trainer.service';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  trainee: TraineeData | null = null;
  trainer: TrainerData | null = null;
  isLoggedIn = false;
  isTrainer = false;
  constructor (private httpTrainee: TraineeService, private httpWorkout: WorkoutService, private httpTrainer: TrainerService, storageService: StorageService) {
    if (storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      if (storageService.getIsTrainer()){
        this.isTrainer = true
        this.trainer = storageService.getUser() as TrainerData
      }
      else {
        this.trainee = storageService.getUser() as TraineeData
      }
    }
    else {
      window.location.replace("/auth/logIn");
    }
  }
}
