import { Component } from '@angular/core';
import { TraineeService } from '../../../core/services/trainee.service';
import { TraineeData } from '../../../core/interfaces/trainee-data';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  trainee: TraineeData | null = null
  constructor(httpTrainee: TraineeService) {
    httpTrainee.getTraineeById(1).then(res => this.trainee = res);
   }
}
