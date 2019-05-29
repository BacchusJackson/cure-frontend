import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { UserRegistrationComponent } from "./components/user-registration/user-registration.component";
import { UserManagementComponent } from "./components/user-management/user-management.component";
import { UserEditFormComponent } from "./components/user-edit-form/user-edit-form.component";
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AuthenticationGuard } from "./authentication.guard";

const routes: Routes = [
  {path:'', component: SigninComponent},
  {path:'entry', component: EntryFormComponent, canActivate: [AuthenticationGuard]},
  {path: 'newUser', component: UserRegistrationComponent, canActivate: [AuthenticationGuard]},
  {path: 'manageUsers', component: UserManagementComponent, canActivate: [AuthenticationGuard]},
  {path: 'editUser', component: UserEditFormComponent, canActivate: [AuthenticationGuard]},
  {path: 'userProfile', component: UserProfileComponent, canActivate: [AuthenticationGuard]},
  {path: '**', redirectTo: 'entry'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }