import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../../../core/services/workout.service';
import { WorkoutData } from '../../../core/interfaces/workout-data';
import { ExerciseService } from '../../../core/services/exercise.service';
import { ExerciseData } from '../../../core/interfaces/exercise-data';

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
  constructor(private activatedRoute: ActivatedRoute, private httpWorkout: WorkoutService, private httpExercise: ExerciseService) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.httpWorkout.getWorkoutById(this.id).then(res => {
      this.workout = res
      this.httpExercise.getExercisesByWorkoutId(this.workout!.id).then(res => {
        this.exercises = res
      });
    });
  }

  async saveChanges() {
    for (let i = 0; i < this.exercises.length; i++) {
      await this.httpExercise.postExercise(this.exercises[i]).then(res => console.log(res));
    }
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
}
