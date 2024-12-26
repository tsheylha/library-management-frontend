import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewComponent } from './books/view/view.component';
import { UserlistComponent } from './user/userlist/userlist.component';

import { MainComponent } from './dashboard/main/main.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  {
    path: 'dashboard',component: DashboardComponent,
    children: [
      { path: '', component: MainComponent }, 
      { path: 'dashboard/main', component: MainComponent },
      { path: 'books/view', component: ViewComponent },
      { path: 'user/userlist', component: UserlistComponent },
    ],
  },
];
