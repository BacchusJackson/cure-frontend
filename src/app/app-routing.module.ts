import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { UserRegistrationComponent } from "./components/user-registration/user-registration.component";
import { UserManagementComponent } from "./components/user-management/user-management.component";
import { UserEditFormComponent } from "./components/user-edit-form/user-edit-form.component";
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  {path:'', component: SigninComponent},
  {path:'entry', component: EntryFormComponent},
  {path: 'newUser', component: UserRegistrationComponent},
  {path: 'manageUsers', component: UserManagementComponent},
  {path: 'editUser', component: UserEditFormComponent},
  {path: 'userProfile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }