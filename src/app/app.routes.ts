import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddComponent } from './books/add/add.component';
import { ViewComponent } from './books/view/view.component';
import { UserlistComponent } from './user/userlist/userlist.component';
import { UpdateComponent } from './user/update/update.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'books/add', component: AddComponent },
  { path: 'books/view', component: ViewComponent },
  { path: 'user/userlist', component: UserlistComponent },
  { path: 'user/update', component: UpdateComponent},

];
