import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddictionService } from '../../../../core/services/addiction.service';
import { TraineeService } from '../../../../core/services/trainee.service';
import { TraineeData } from '../../../../core/interfaces/trainee-data';
@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  loginForm: FormGroup;

  isSended = false;
  isAppliedCode = false;
  constructor(private httpAddictional: AddictionService, private httpTrainee: TraineeService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      code: new FormControl(''),
      newPassword: new FormControl('')
    })
  }
  codeGet: number = 0;
  onSubmit() {
    if (!this.isSended && !this.isAppliedCode){
      this.isSended = true;
      this.httpAddictional.forgotPassword(this.loginForm.value.email).then(res =>{
          this.codeGet = res
          if (this.codeGet == 0){
            alert("Пользователь не найден")
            window.location.reload()
          }
          }
      )
    } else if(this.isSended && !this.isAppliedCode){
      if (this.codeGet === Number(this.loginForm.value.code)){
        this.isAppliedCode = true;
      }
      else {
        alert("Код не верный");
      }
    } else {
      let trainee: TraineeData;
      this.httpTrainee.getTraineeByEmail(this.loginForm.value.email).then(res => {
        trainee = res;
        trainee.password = this.loginForm.value.newPassword;
        console.log(trainee)
        console.log(this.loginForm.value.newPassword)
        this.httpTrainee.postTrainee(trainee).then(res =>{ 
          alert("Пароль успешно изменен")
          window.location.replace("/auth/logIn")
        });
      });
    }
  }
}
