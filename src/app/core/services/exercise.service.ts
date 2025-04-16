import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExerciseData } from '../interfaces/exercise-data';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) {}

  async getAllExercises() : Promise<ExerciseData[]>{
    return await firstValueFrom( this.http.get<ExerciseData[]>(environment.apiUrl + '/api/exercise/all') );
  }

  async getExerciseById(id: number) : Promise<ExerciseData> {
    return await firstValueFrom( this.http.get<ExerciseData>(environment.apiUrl + '/api/exercise/' + id) ); 
  }

  async postExercise(exercise: ExerciseData) : Promise<ExerciseData> {
    return await firstValueFrom( this.http.post<ExerciseData>(environment.apiUrl + '/api/exercise', exercise) ); 
  }

  async deleteExercise(id: number) : Promise<ExerciseData> {
    return await firstValueFrom( this.http.delete<ExerciseData>(environment.apiUrl + '/api/exercise/' + id) ); 
  }
}
