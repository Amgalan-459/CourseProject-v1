import { Injectable } from '@angular/core';
import { TraineeData } from '../interfaces/trainee-data';
import { TrainerData } from '../interfaces/trainer-data';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: TraineeData | TrainerData, isTrainer: boolean): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.sessionStorage.setItem('isTrainer', JSON.stringify(isTrainer));
  }

  public getUser(): TraineeData | TrainerData | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    let isTrainer = JSON.parse(window.sessionStorage.getItem('isTrainer')!);
    if (user) {
      if (isTrainer) {
        return JSON.parse(user) as TrainerData;
      }
      return JSON.parse(user) as TraineeData;
    }

    return null;
  }

  public getIsTrainer(): boolean {
    const isTrainer = window.sessionStorage.getItem('isTrainer');
    if (isTrainer) {
      return JSON.parse(isTrainer);
    }

    return false;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
