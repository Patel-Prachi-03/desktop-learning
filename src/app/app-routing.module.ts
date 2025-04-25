import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'login',
    component :RegistrationComponent
  },
  {
    path:'signup',
    component: SignupComponent
  },{
    path:'',
    component:HomepageComponent
  },
  {
    path:'home',
    component:HomepageComponent
  },{
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
