import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';

const routes: Routes = [
  {path:'', component: SigninComponent},
  {path:'entry', component: EntryFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }