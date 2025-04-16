import { TrainerData } from "./trainer-data";
import { WorkoutData } from "./workout-data";

export interface TraineeData {
    id: number,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string | null,
    sex: number,
    countOfTrainsInWeek: number,
    isActive: boolean,
    trainerId: number,
    trainer: TrainerData,
    workouts: WorkoutData[]
}
