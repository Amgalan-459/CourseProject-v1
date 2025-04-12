import { TrainerData } from "./trainer-data";
import { WorkoutData } from "./workout-data";

export interface TraineeData {
    id: number,
    name: string,
    surname: string,
    email: string,
    countOfTrainsInWeek: number,
    isActive: boolean,
    trainerId: number,
    trainer: TrainerData,
    workouts: WorkoutData[]
}
