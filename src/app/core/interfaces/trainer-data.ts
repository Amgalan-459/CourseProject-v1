import { TraineeData } from "./trainee-data";

export interface TrainerData {
    id: number,
    name: string,
    surname: string,
    email: string,
    passworf: string,
    trainees: TraineeData[]
}
