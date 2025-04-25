import { Component, inject } from '@angular/core';
import { TraineeService } from '../../../../core/services/trainee.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../../../core/services/storage.service';
import { TrainerService } from '../../../../core/services/trainer.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  // templateUrl: './log-in.component.html',
  template: `
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">

  <div class="login">
      <div class="login-screen">
        <div class="app-title">
          <h1>Login</h1>
        </div>

        <form class="login-form" (submit)="onSubmit()" [formGroup]="loginForm">
          <div class="control-group">
            <input type="email" class="login-field" value="" placeholder="email" id="login-name" formControlName="email">
            <label class="login-field-icon fui-user" for="login-name"></label>
          </div>

          <div class="control-group">
            <input type="password" class="login-field" value="" placeholder="password" id="login-pass" formControlName="password">
            <label class="login-field-icon fui-lock" for="login-pass"></label>
          </div>

          <div class="control-group checkbox-group">
            <label class="checkbox" for="login-remember">Is trainer</label>
            <input type="checkbox" id="login-remember" class="login-remember" formControlName="isTrainer" />
          </div>

          <button class="btn btn-primary btn-large btn-block" [disabled]="loginForm.invalid">login</button>
          <a class="login-link" routerLink="/auth/forgotPass">Lost your password?</a>
        </form>
      </div>
    </div>
  `,
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  httpTrainee: TraineeService = inject(TraineeService);
  httpTrainer: TrainerService = inject(TrainerService);
  storageService: StorageService = inject(StorageService);

  constructor( httpTrainer: TrainerService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(''),
      isTrainer: new FormControl('')
    })

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      window.location.replace("/");
    }
  }

  onSubmit(): void {
    //тут скорее всего переписать надо будет

    if (this.loginForm.value.isTrainer) {
      this.httpTrainer.getTrainerByEmail(this.loginForm.value.email).then(res => {
        if (res == null) {
          this.isLoginFailed = true;
          alert("логин или пароль не верны");
          return;
        }
        if (res.password == this.loginForm.value.password) {
          if (!res.isActive) {
            this.isLoginFailed = true;
            alert("логин или пароль не верны");
            window.location.replace("/auth/logIn");
            return;
          }
          this.storageService.saveUser(res, true);
          this.isLoggedIn = true;
          window.location.replace("/");
        }
        else{
          this.isLoginFailed = true;
          alert("логин или пароль не верны");
        }
      })
      return;
    }

    this.httpTrainee.getTraineeByEmail(this.loginForm.value.email).then(res => {
      if (res == null) {
        this.isLoginFailed = true;
        alert("логин или пароль не верны");
        return;
      }
      if (res.password == this.loginForm.value.password) {
        this.storageService.saveUser(res, false);
        this.isLoggedIn = true;
        window.location.replace("/");
      }
      else{
        this.isLoginFailed = true;
        alert("логин или пароль не верны");
      }
    });
  }
}
