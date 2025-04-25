import { afterNextRender, AfterRenderPhase, ChangeDetectorRef, Component, inject, Injector, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StorageService } from './core/services/storage.service';
import { TraineeData } from './core/interfaces/trainee-data';
import { TrainerData } from './core/interfaces/trainer-data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'CourseProject-v1';
  injector = inject(Injector);
  isLoggedIn = false;
  isTrainer = false;
  user: TraineeData | TrainerData | null = null;
  constructor(private cd : ChangeDetectorRef, private storageService: StorageService) {
  }

  ngOnInit(): void {
    afterNextRender(() => 
      this.getUser(),
    {injector: this.injector, phase: AfterRenderPhase.Read}
    );
  }

  getUser() {
    if (this.storageService.isLoggedIn()){
      this.isLoggedIn = true;
      this.user = this.storageService.getUser();
      this.isTrainer = this.storageService.getIsTrainer();
      this.cd.detectChanges();
    }
  }

  logOut() {
    this.storageService.clean();
    this.isLoggedIn = false;
    this.user = null;
    window.location.replace("/auth/logIn");
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

