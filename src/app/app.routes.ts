import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewComponent } from './books/view/view.component';
import { UserlistComponent } from './user/userlist/userlist.component';

import { MainComponent } from './dashboard/main/main.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: MainComponent }, // Default child route for dashboard
      { path: 'dashboard/main', component: MainComponent }, // Optional, if you want explicit navigation to 'dashboard/main'
      { path: 'books/view', component: ViewComponent },
      { path: 'user/userlist', component: UserlistComponent },
    ],
  },
];
