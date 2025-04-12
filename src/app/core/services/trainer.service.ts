import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrainerData } from '../interfaces/trainer-data';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor(private http: HttpClient) {}

  async getAllTrainers() : Promise<TrainerData[]>{
    return await firstValueFrom( this.http.get<TrainerData[]>('http://192.168.1.64:5000/api/trainer/all') );
  }

  async getTrainerById(id: number) : Promise<TrainerData> {
    return await firstValueFrom( this.http.get<TrainerData>('http://192.168.1.64:5000/api/trainer/' + id) ); 
  }

  async postTrainer(trainer: TrainerData) : Promise<TrainerData> {
    return await firstValueFrom( this.http.post<TrainerData>('http://192.168.1.64:5000/api/trainer', trainer) ); 
  }

  async deleteTrainer(id: number) : Promise<TrainerData> {
    return await firstValueFrom( this.http.delete<TrainerData>('http://192.168.1.64:5000/api/trainer/' + id) ); 
  }
}
