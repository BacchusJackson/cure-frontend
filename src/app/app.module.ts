import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

//Material Design Stuff
import {MatTabsModule} from '@angular/material/tabs';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import { MatTableModule } from "@angular/material";


//Components
import { SigninComponent } from './components/signin/signin.component';
import { AppComponent } from "./app.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserManagementComponent } from './components/user-management/user-management.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NavbarComponent,
    EntryFormComponent,
    UserRegistrationComponent,
    UserManagementComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, HttpClientModule,
    BrowserAnimationsModule, ReactiveFormsModule,
    MatTabsModule, MatToolbarModule, MatMenuModule, MatIconModule,
    MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);