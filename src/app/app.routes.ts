import { Routes } from '@angular/router';
import { HomeComponent } from './user/pages/home/home.component';
import { AboutUsComponent } from './user/pages/about-us/about-us.component';
import { SignUpComponent } from './user/pages/auth/sign-up/sign-up.component';
import { LogInComponent } from './user/pages/auth/log-in/log-in.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'aboutUs', component: AboutUsComponent },
    { path: 'auth/signUp', component: SignUpComponent },
    { path: 'auth/logIn', component: LogInComponent },
    { path: '**', redirectTo: 'home' }
];
