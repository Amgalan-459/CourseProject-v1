import { ExerciseData } from "./exercise-data";
import { TraineeData } from "./trainee-data";

export interface WorkoutData {
    id: number,
    date: string,
    trainerId: number,
    trainee: TraineeData,
    exercises: ExerciseData[]
}
