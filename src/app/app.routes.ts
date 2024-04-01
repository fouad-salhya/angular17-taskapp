import { SignupComponent } from './signup/signup.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { authGuard } from './guards/auth.guard';
import { afterAuthGuard } from './guards/after-auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate:[authGuard] },
    { path: 'signin', component: SigninComponent, canActivate:[afterAuthGuard]},
    { path: 'signup', component: SignupComponent, canActivate:[afterAuthGuard] }
    
];
