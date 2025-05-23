import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../../../core/services/workout.service';
import { WorkoutData } from '../../../core/interfaces/workout-data';
import { ExerciseService } from '../../../core/services/exercise.service';
import { ExerciseData } from '../../../core/interfaces/exercise-data';
import { StorageService } from '../../../core/services/storage.service';
import { TraineeData } from '../../../core/interfaces/trainee-data';
import { TrainerData } from '../../../core/interfaces/trainer-data';
import { ExerciseRawData } from '../../../core/interfaces/exercise-raw-data';
import { ExerciseRawService } from '../../../core/services/exercise-raw.service';

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
  exercisesraw: ExerciseRawData[] = [];
  constructor(private activatedRoute: ActivatedRoute, private httpWorkout: WorkoutService, private httpExercise: ExerciseService, storageService: StorageService,
      private httpExerciseRaw: ExerciseRawService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      if (storageService.getIsTrainer()){
        this.isTrainer = true
        this.trainer = storageService.getUser() as TrainerData
        let traineeId = Number(localStorage.getItem('traineeId')!);
        httpWorkout.getWorkoutsByTraineeId(traineeId).then(res => {
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
        httpExerciseRaw.getAllExerciseRaws().then(res =>{
          this.exercisesraw = res;
        });
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

  async createExercise() {
    let exercise = {
      id: 0,
      name: "",
      weightPlan: [0, 0, 0, 0, 0],
      repPlan: [0, 0, 0, 0, 0],
      weightFact: [0, 0, 0, 0, 0],
      repFact: [0, 0, 0, 0, 0],
      videoUrl: "#",
      description: "none",
      workoutId: this.id,
      workout: null
    }

    await this.httpExercise.postExercise(exercise as ExerciseData)
    this.saveChanges()
    window.location.reload();
  }

  async deleteExercise(index: number) {
    let exId = this.exercises[index].id
    await this.httpExercise.deleteExercise(exId);
    window.location.reload();
  }


  onChangeRepF(exerciseId: number, index: number, $event: Event) {
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

  onChangeWeightF(exerciseId: number, index: number, $event: Event) {
    let value = ($event.target as HTMLInputElement).value
    let weightF = []
    let exercise = this.exercises.find(ex => ex.id == exerciseId)!;
    for (let i = 0; i < exercise.weightPlan.length; i++) {
      if (i == index){
        weightF.push(Number(value))
      }
      else {
        weightF.push(exercise.weightFact[i])
      }
    }
    this.exercises.map(ex => {
      if (ex.id == exerciseId) {
        ex.weightFact = weightF
      }
      return ex;
    });
  }

  //for trainer
  onChangeRepP(exerciseId: number, index: number, $event: Event) {
    let value = ($event.target as HTMLInputElement).value
    let repP = []
    let exercises = this.exercises.find(ex => ex.id == exerciseId)!;
    for (let i = 0; i < exercises.repPlan.length; i++) {
      if (i == index){
        repP.push(Number(value))
      }
      else {
        repP.push(exercises.repPlan[i])
      }
    }
    this.exercises.map(ex => {
      if (ex.id == exerciseId) {
        ex.repPlan = repP
      }
      return ex;
    });
  }

  onChangeWeightP(exerciseId: number, index: number, $event: Event) {
    let value = ($event.target as HTMLInputElement).value
    let weightP = []
    let exercises = this.exercises.find(ex => ex.id == exerciseId)!;
    for (let i = 0; i < exercises.weightPlan.length; i++) {
      if (i == index){
        weightP.push(Number(value))
      }
      else {
        weightP.push(exercises.weightPlan[i])
      }
    }
    this.exercises.map(ex => {
      if (ex.id == exerciseId) {
        ex.weightPlan = weightP
      }
      return ex;
    });
  }

  onChangeDescription(exerciseId: number, $event: Event) {
    let value = ($event.target as HTMLInputElement).value
    this.exercises.map(ex => {
      if (ex.id == exerciseId) {
        ex.description = value
      }
      return ex;
    });
  }

  selectedExRaw: ExerciseRawData | null = null
  onChangeName(exerciseId: number, $event: Event) {
    let value = ($event.target as HTMLInputElement).value
    this.httpExerciseRaw.getExerciseRawById(Number(value)).then(res => {
      this.selectedExRaw = res      
      this.exercises.map(ex => {
        if (ex.id == exerciseId) {
          ex.name = this.selectedExRaw!?.name
          ex.videoUrl = this.selectedExRaw!?.exerciseUrl
        }
        return ex;
      });
    })
  }
}