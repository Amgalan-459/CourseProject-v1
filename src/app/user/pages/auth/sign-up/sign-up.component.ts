import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TraineeService } from '../../../../core/services/trainee.service';
import { TrainerService } from '../../../../core/services/trainer.service';
import { StorageService } from '../../../../core/services/storage.service';
import { count } from 'console';
import { TrainerData } from '../../../../core/interfaces/trainer-data';
import { TraineeData } from '../../../../core/interfaces/trainee-data';
import { match } from 'assert';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signupForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  httpTrainee: TraineeService = inject(TraineeService);
  httpTrainer: TrainerService = inject(TrainerService);
  storageService: StorageService = inject(StorageService);

  constructor( httpTrainer: TrainerService) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      isTrainer: new FormControl(''),
      name: new FormControl(''),
      surname: new FormControl(''),
      sex: new FormControl(''),
      phoneNumber: new FormControl(''),
      countOfTrainsInWeek: new FormControl(''),
      trainerId: new FormControl(''),
      matchPassword: new FormControl('')
    })

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      window.location.replace("/");
    }
  }

  onSubmit(): void {
    if (this.signupForm.value.password != this.signupForm.value.matchPassword) {
      this.isLoginFailed = true;
      alert("пароли не совпадают");
      return;
    }

    if (this.signupForm.value.isTrainer) {
      let trainer = {
        id: 0,
        name: this.signupForm.value.name,
        surname: this.signupForm.value.surname,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        phoneNumber: this.signupForm.value.phoneNumber,
        sex: this.signupForm.value.sex,
        isActive: true,
        trainees: []
      }
      this.httpTrainer.postTrainer(trainer as TrainerData).then(res => {
        if (res == null) {
          this.isLoginFailed = true;
          alert("логин или пароль не верны");
          return;
        }
        this.storageService.saveUser(res, true);
        this.isLoggedIn = true;
        alert("Регистрация прошла успешно");
        window.location.replace("/");
      })
      return;
    }

    let trainee = {
      id: 0,
      name: this.signupForm.value.name,
      surname: this.signupForm.value.surname,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      phoneNumber: this.signupForm.value.phoneNumber,
      sex: this.signupForm.value.sex,
      countOfTrainsInWeek: this.signupForm.value.countOfTrainsInWeek,
      isActive: true,
      trainerId: this.signupForm.value.trainerId,
      trainer: null,
      workouts: []
    }
    this.httpTrainee.postTrainee(trainee as TraineeData).then(res => {
      if (res == null) {
        this.isLoginFailed = true;
        alert("логин или пароль не верны");
        return;
      }
      this.storageService.saveUser(res, false);
      this.isLoggedIn = true;
      window.location.replace("/");
    });

    alert("Регистрация прошла успешно");
  }
}
