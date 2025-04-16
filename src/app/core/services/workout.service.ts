import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkoutData } from '../interfaces/workout-data';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) {}

  async getAllWorkouts() : Promise<WorkoutData[]>{
    return await firstValueFrom( this.http.get<WorkoutData[]>(environment.apiUrl + '/api/workout/all') );
  }

  async getWorkoutById(id: number) : Promise<WorkoutData> {
    return await firstValueFrom( this.http.get<WorkoutData>(environment.apiUrl + '/api/workout/' + id) ); 
  }

  async postWorkout(workout: WorkoutData) : Promise<WorkoutData> {
    return await firstValueFrom( this.http.post<WorkoutData>(environment.apiUrl + '/api/workout', workout) ); 
  }

  async deleteWorkout(id: number) : Promise<WorkoutData> {
    return await firstValueFrom( this.http.delete<WorkoutData>(environment.apiUrl + '/api/workout/' + id) ); 
  }
}
