import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../../../core/services/workout.service';
import { WorkoutData } from '../../../core/interfaces/workout-data';
import { ExerciseService } from '../../../core/services/exercise.service';
import { ExerciseData } from '../../../core/interfaces/exercise-data';
import { StorageService } from '../../../core/services/storage.service';
import { TraineeData } from '../../../core/interfaces/trainee-data';
import { TrainerData } from '../../../core/interfaces/trainer-data';

@Component({
  selector: 'app-workout',
  imports: [],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})
export class WorkoutComponent {

  id: number;
  workout: WorkoutData | null = null;
  exercises: ExerciseData[] = [];
  isLoggedIn = false;
  isTrainer = false;
  trainee: TraineeData | null = null;
  trainer: TrainerData | null = null;
  constructor(private activatedRoute: ActivatedRoute, private httpWorkout: WorkoutService, private httpExercise: ExerciseService, storageService: StorageService) {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      if (storageService.getIsTrainer()){
        this.isTrainer = true
        this.trainer = storageService.getUser() as TrainerData
      }
      else {
        this.trainee = storageService.getUser() as TraineeData 
        httpWorkout.getWorkoutsByTraineeId(this.trainee.id).then(res => {
          let workout = res.find(workout => workout.id == this.id)
          if (!workout) {
            alert("Тренировка не найдена");
            window.location.replace("/workouts");
          }
        });        
        this.httpWorkout.getWorkoutById(this.id).then(res => {
          this.workout = res
          this.httpExercise.getExercisesByWorkoutId(this.workout!.id).then(res => {
            this.exercises = res
          });
        });
      }
    }
    else {
      window.location.replace("/auth/logIn");
    }
  }

  async saveChanges() {
    for (let i = 0; i < this.exercises.length; i++) {
      await this.httpExercise.postExercise(this.exercises[i]);
    }
    alert("Изменения сохранены");
  }

  onChangeRep(exerciseId: number, index: number, $event: Event) {
    let value = ($event.target as HTMLInputElement).value
    let repF = []
    let exercises = this.exercises.find(ex => ex.id == exerciseId)!;
    for (let i = 0; i < exercises.repPlan.length; i++) {
      if (i == index){
        repF.push(Number(value))
      }
      else {
        repF.push(exercises.repFact[i])
      }
    }
    this.exercises.map(ex => {
      if (ex.id == exerciseId) {
        ex.repFact = repF
      }
      return ex;
    });
  }

  onChangeWeight(exerciseId: number, index: number, $event: Event) {
    let value = ($event.target as HTMLInputElement).value
    let weightF = []
    let exercises = this.exercises.find(ex => ex.id == exerciseId)!;
    for (let i = 0; i < exercises.weightPlan.length; i++) {
      if (i == index){
        weightF.push(Number(value))
      }
      else {
        weightF.push(exercises.repFact[i])
      }
    }
    this.exercises.map(ex => {
      if (ex.id == exerciseId) {
        ex.weightFact = weightF
      }
      return ex;
    });
  }
}
