import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { TraineeService } from '../../../core/services/trainee.service';
import { TraineeData } from '../../../core/interfaces/trainee-data';

@Component({
  selector: 'app-trainee',
  imports: [RouterLink],
  templateUrl: './trainee.component.html',
  styleUrl: './trainee.component.css'
})
export class TraineeComponent {
  id: number;
  trainee: TraineeData | null = null
  constructor(private activatedRoute: ActivatedRoute, httpTrainee: TraineeService) {
    this.id = this.activatedRoute.snapshot.params['traineeId'];
    httpTrainee.getTraineeById(this.id).then(res => this.trainee = res);
    localStorage.setItem('traineeId', this.id.toString());
  }
}
