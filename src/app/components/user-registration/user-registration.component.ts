import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as randomWords from "random-words";
import { AdminUsersService } from 'src/app/services/admin-users.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  //TODO: Add Clinic and Site Dropdowns
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  tempPassword = null;
  createdUsername = null;

  constructor(private router:Router, private adminUsersService:AdminUsersService, private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  getErrorMessage(field:string):string{
    switch(field) {
      case 'firstName':
        return this.firstName.hasError('required') ? 'This field cannot be left blank' : '';
      case 'lastName':
        return this.lastName.hasError('required') ? 'This field cannot be left blank' : '';
      case 'username': 
        return this.username.hasError('required') ? 'this field cannot be left blank' : '';
    };
  };

  // Generate a random password
  getRandomPassword(): string {
    let firstWord: string = randomWords();
    firstWord = firstWord.toUpperCase();
    let secondWord: string = randomWords();
    let randNum = Math.floor(Math.random() * 100);

    return `${randNum}${firstWord}@${secondWord}`
  }
  async onSubmit() {
    // Validate the userform
    if(this.firstName.invalid || this.lastName.invalid || this.username.invalid) {
      this.snackBar.open('You missed something..', 'dismiss', {duration: 3000});
    };

    // check if user name is taken
    let queryUser = await this.adminUsersService.getUserByUsername(this.username.value);

    // Show error message if username is taken
    if(queryUser) {
      this.snackBar.open('Username is taken..', 'dismiss', {duration: 3000});
      return false;
    };

    // Generate a random password and log the created username
    this.tempPassword = this.getRandomPassword();

    // Create a new user object
    let userInfo = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      username: this.username.value,
      password: this.tempPassword
    }
    // Send the request through admin service
    let createUserRequest = await this.adminUsersService.createUser(userInfo);

    if(!createUserRequest) {
      this.snackBar.open('Something went wrong while creating the user...', 'dismiss', {duration: 3000});
      return false;
    };
    // Query the newly created user to ensure it is in the database
    let createdUser = await this.adminUsersService.getUserByUsername(this.username.value);

    console.log(createdUser);

    if(!createdUser) {
      this.snackBar.open('Something went wrong... Cannot find new user in database', 'dismiss', {duration: 3000});
      return false;
    }

    //If everything is successful
    this.createdUsername = createdUser.username;
    this.snackBar.open('User has been successfully created!', 'dismiss', {duration: 3000});
    
  }

  onClear() { 
    this.firstName.reset()
    this.lastName.reset()
    this.username.reset()
  }
}
