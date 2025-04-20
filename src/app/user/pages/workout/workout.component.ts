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
        console.log(this.exercises);
      });
    });
  }
}
