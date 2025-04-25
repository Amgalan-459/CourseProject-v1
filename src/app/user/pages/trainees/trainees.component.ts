import { Component } from '@angular/core';
import { TraineeData } from '../../../core/interfaces/trainee-data';
import { TrainerData } from '../../../core/interfaces/trainer-data';
import { TraineeService } from '../../../core/services/trainee.service';
import { StorageService } from '../../../core/services/storage.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trainees',
  imports: [RouterLink],
  templateUrl: './trainees.component.html',
  styleUrl: './trainees.component.css'
})
export class TraineesComponent {
  trainees: TraineeData[] | null = null;
  trainer: TrainerData | null = null;
  isLoggedIn = false;
  isTrainer = false;
  constructor (private httpTrainee: TraineeService, storageService: StorageService) {
    if (storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      if (storageService.getIsTrainer()){
        this.isTrainer = true
        this.trainer = storageService.getUser() as TrainerData
        this.httpTrainee.getTraineesByTrainerId(this.trainer.id).then(res => this.trainees = res);
        console.log(this.trainees)
      }
      else {
        window.location.replace("/home");
      }
    }
    else {
      window.location.replace("/auth/logIn");
    }
  }
}
