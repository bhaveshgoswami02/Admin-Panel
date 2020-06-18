import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './service/AuthService/auth-guard.service';
import { HomeComponent } from './admin/home/home.component';


const routes: Routes = [
  {path:'',redirectTo:'/signin', pathMatch:'full'},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'admin',component:AdminComponent, canActivate:[AuthGuardService], children:[
    {path:'',component:HomeComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
