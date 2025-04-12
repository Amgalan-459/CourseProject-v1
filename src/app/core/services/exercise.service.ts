import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExerciseData } from '../interfaces/exercise-data';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) {}

  async getAllExercises() : Promise<ExerciseData[]>{
    return await firstValueFrom( this.http.get<ExerciseData[]>('http://192.168.1.64:5000/api/exercise/all') );
  }

  async getExerciseById(id: number) : Promise<ExerciseData> {
    return await firstValueFrom( this.http.get<ExerciseData>('http://192.168.1.64:5000/api/exercise/' + id) ); 
  }

  async postExercise(exercise: ExerciseData) : Promise<ExerciseData> {
    return await firstValueFrom( this.http.post<ExerciseData>('http://192.168.1.64:5000/api/exercise', exercise) ); 
  }

  async deleteExercise(id: number) : Promise<ExerciseData> {
    return await firstValueFrom( this.http.delete<ExerciseData>('http://192.168.1.64:5000/api/exercise/' + id) ); 
  }
}
