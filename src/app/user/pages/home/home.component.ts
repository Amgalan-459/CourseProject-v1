import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TraineeService } from '../../../core/services/trainee.service';
import { TraineeData } from '../../../core/interfaces/trainee-data';
import { WorkoutService } from '../../../core/services/workout.service';
import { TrainerData } from '../../../core/interfaces/trainer-data';
import { TrainerService } from '../../../core/services/trainer.service';
import { StorageService } from '../../../core/services/storage.service';
import { LogInComponent } from "../auth/log-in/log-in.component";

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
  user: TraineeData | TrainerData | null = null;
  isLoggedIn = false;
  isTrainer = false;
  constructor (private httpTrainee: TraineeService, private httpWorkout: WorkoutService, private httpTrainer: TrainerService, storageService: StorageService) {
    if (storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      if (storageService.getIsTrainer()){
        this.isTrainer = true
      }
      this.user = storageService.getUser()!;
    }
    else {
      window.location.replace("/auth/logIn");
    }
  }


  async goToWorkout() {
    if (!this.isTrainer) {
      await this.httpWorkout.getWorkoutsByTraineeId(this.user!.id).then(res => console.log(res));
    }
  }
}
