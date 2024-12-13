import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddComponent } from './books/add/add.component';
import { ViewComponent } from './books/view/view.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'books/add', component: AddComponent },
  { path: 'books/view', component: ViewComponent },
];
