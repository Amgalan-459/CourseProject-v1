import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkoutData } from '../interfaces/workout-data';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) {}

  async getAllWorkouts() : Promise<WorkoutData[]>{
    return await firstValueFrom( this.http.get<WorkoutData[]>('http://192.168.1.72:5000/api/workout/all') );
  }

  async getWorkoutById(id: number) : Promise<WorkoutData> {
    return await firstValueFrom( this.http.get<WorkoutData>('http://192.168.1.72:5000/api/workout/' + id) ); 
  }

  async postWorkout(workout: WorkoutData) : Promise<WorkoutData> {
    return await firstValueFrom( this.http.post<WorkoutData>('http://192.168.1.72:5000/api/workout', workout) ); 
  }

  async deleteWorkout(id: number) : Promise<WorkoutData> {
    return await firstValueFrom( this.http.delete<WorkoutData>('http://192.168.1.72:5000/api/workout/' + id) ); 
  }
}
