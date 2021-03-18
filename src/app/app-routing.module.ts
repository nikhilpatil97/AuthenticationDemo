import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './shared/authguard/auth.guard';

const routes: Routes = [
  { path:'details', component:DetailsComponent, canActivate: [AuthGuard] },
  { path:'login', component:LoginComponent},
  { path: '', redirectTo:'/details', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
