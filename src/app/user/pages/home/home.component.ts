import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TraineeService } from '../../../core/services/trainee.service';
import { TraineeData } from '../../../core/interfaces/trainee-data';
import { WorkoutService } from '../../../core/services/workout.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  speeches: string[] = [
    "Тренировка — это момент, когда ты превосходишь самого себя",
    "Ты сильнее, чем ты думаешь, и способен на большее",
    "Придерживайся своих целей и никогда не сдавайся",
    "Спорт помогает тебе раскрыть свой истинный потенциал",
    "Помни, что каждая тренировка приближает тебя к цели",
    "Тренируйся сегодня, чтобы быть сильнее завтра",
    "Твои мысли становятся действиями, а действия — привычками",
    "Настоящая тренировка начинается, когда ты хочешь остановиться"
  ]
  trainee: TraineeData | null = null;
  constructor (private httpTrainee: TraineeService, private httpWorkout: WorkoutService) {
    this.httpTrainee.getTraineeById(1).then(res => this.trainee = res);
  }


  async goToWorkout() {
    await this.httpWorkout.getWorkoutsByTraineeId(this.trainee!.id).then(res => console.log(res));
  }
}
