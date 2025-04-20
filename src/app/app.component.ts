import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TraineeService } from './core/services/trainee.service';
import { TraineeData } from './core/interfaces/trainee-data';
import { TrainerService } from './core/services/trainer.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CourseProject-v1';
  trainee: TraineeData | null = null;

  constructor(private traineeService: TraineeService, private trainerService: TrainerService) {
    // traineeService.getAllTrainees().then(res => {
    //   console.log(res);
    //   this.trainee = res[0];

    //   trainerService.getTrainerById(this.trainee.trainerId).then(res => {
    //     console.log(res);
    //   })
    // });
  }

  async getTrainee() : Promise<TraineeData> {
    this.trainee = await this.traineeService.getTraineeById(1);
    return this.trainee;
  }

  /*
  public bool ValidatePassword(string password)
{
    string errorMessage = string.Empty;
    bool allowed = false;

    var hasNumber = new Regex(@"[0-9]+");
    var hasUpperChar = new Regex(@"[A-Z]+");
    var hasMiniMaxChars = new Regex(@".{8,15}");
    var hasLowerChar = new Regex(@"[a-z]+");
    var hasSymbols = new Regex(@"[!@#$%^&*()_+=\[{\]};:<>|./?,-]");

    if (password is null || string.IsNullOrWhiteSpace(password))
    {
        errorMessage = "Password should not be empty";
    }
    else if (!hasLowerChar.IsMatch(password))
    {
        errorMessage = "Password should contain At least one lower case letter";
    }
    else if (!hasUpperChar.IsMatch(password))
    {
        errorMessage = "Password should contain At least one upper case letter";
    }
    else if (!hasMiniMaxChars.IsMatch(password))
    {
        errorMessage = "Password should not be less than or greater than 12 characters";
    }
    else if (!hasNumber.IsMatch(password))
    {
        errorMessage = "Password should contain At least one numeric value";
    }
    else if (!hasSymbols.IsMatch(password))
    {
        errorMessage = "Password should contain At least one special case characters";
    }
    else
    {
        allowed = true;
    }

    return allowed;
}
  */
}
