import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TraineeData } from '../interfaces/trainee-data';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  constructor(private http: HttpClient) {}

  async getAllTrainees() : Promise<TraineeData[]>{
    return await firstValueFrom( this.http.get<TraineeData[]>('http://192.168.1.64:5000/api/trainee/all') );
  }

  async getTraineeById(id: number) : Promise<TraineeData> {
    return await firstValueFrom( this.http.get<TraineeData>('http://192.168.1.64:5000/api/trainee/' + id) ); 
  }

  async postTrainee(trainee: TraineeData) : Promise<TraineeData> {
    return await firstValueFrom( this.http.post<TraineeData>('http://192.168.1.64:5000/api/trainee', trainee) ); 
  }

  async deleteTrainee(id: number) : Promise<TraineeData> {
    return await firstValueFrom( this.http.delete<TraineeData>('http://192.168.1.64:5000/api/trainee/' + id) ); 
  }
}
