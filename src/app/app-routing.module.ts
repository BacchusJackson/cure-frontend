import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { UserRegistrationComponent } from "./components/user-registration/user-registration.component";
import { UserManagementComponent } from "./components/user-management/user-management.component";

const routes: Routes = [
  {path:'', component: SigninComponent},
  {path:'entry', component: EntryFormComponent},
  {path: 'newUser', component: UserRegistrationComponent},
  {path: 'manageUsers', component: UserManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }