import { Routes } from '@angular/router';
import { HomeComponent } from './user/pages/home/home.component';
import { AboutUsComponent } from './user/pages/about-us/about-us.component';
import { SignUpComponent } from './user/pages/auth/sign-up/sign-up.component';
import { LogInComponent } from './user/pages/auth/log-in/log-in.component';
import { ProfileComponent } from './user/pages/profile/profile.component';
import { WorkoutsComponent } from './user/pages/workouts/workouts.component';
import { HelpComponent } from './user/pages/help/help.component';
import { WorkoutComponent } from './user/pages/workout/workout.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'aboutUs', component: AboutUsComponent },
    { path: 'auth/signUp', component: SignUpComponent },
    { path: 'auth/logIn', component: LogInComponent },
    { path: "profile", component: ProfileComponent },
    { path: 'workouts', component: WorkoutsComponent },
    { path: 'workouts/:id', component:WorkoutComponent },
    { path: 'help', component: HelpComponent },
    { path: '**', redirectTo: 'home' }
];
