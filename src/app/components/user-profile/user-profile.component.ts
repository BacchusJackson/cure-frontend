import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material';
import { isUndefined } from 'util';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  // Create new form controls
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  displayName = new FormControl('', [Validators.required]);

  constructor(private usersService:UsersService, private snackBar:MatSnackBar, private dialog:MatDialog) { }

  ngOnInit() {
    // Pull the existing values from logged in user
    this.firstName.setValue(this.usersService.mainUser.firstName);
    this.lastName.setValue(this.usersService.mainUser.lastName);
    this.displayName.setValue(this.usersService.mainUser.displayName);
  }
  getErrorMessage(field:string):string {
    const blankMessage = 'this field cannot be left blank';
    switch(field) {
      case 'firstName':
        return this.firstName.hasError('required') ? blankMessage : '';
      case 'lastName':
        return this.lastName.hasError('required') ? blankMessage : '';
      case 'displayName':
        return this.displayName.hasError('required') ? blankMessage : '';
      };
    };

  async onSubmit() {
    if(this.firstName.valid && this.lastName.valid && this.displayName.valid) {
      let updateRequest = await this.usersService.updateUserInfo({
        firstName: this.firstName.value, 
        lastName: this.lastName.value, 
        displayName: this.displayName.value
      });
      // The return should be the updated user. If there's no username, something went wrong
      if(isUndefined(updateRequest.username)) {
        this.snackBar.open('Something went wrong...', 'dismiss', {duration: 3000});
      }else {
        this.usersService.getUser(this.usersService.mainUser.token);
        this.snackBar.open('Successful update!', 'dismiss', {duration: 3000})
      };

    }
  }

  onResetPassword() {
    this.dialog.open(ChangePasswordDialog);
  }
}

@Component({
  selector: 'changePasswordDialog',
  templateUrl: 'changePasswordDialog.html',
})
export class ChangePasswordDialog {

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialog>,
    private usersService: UsersService,
    private snackBar: MatSnackBar
    
    ) {}
  password = new FormControl('', [Validators.pattern('^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])([^\\s]){6,25}$')]);
  passwordConfirm = new FormControl('', [Validators.pattern('^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])([^\\s]){6,25}$')]);

  async onSubmit() {
    if(this.password.value !== this.passwordConfirm.value) {
      this.snackBar.open('Your passwords do not match!', 'dismiss', {duration: 3000})
      return false};
    if(this.password.hasError('pattern') || this.passwordConfirm.hasError('pattern')) {
      this.snackBar.open('Your password is missing a required character or is not long enough!', 'dismiss', {duration: 3000})
      return false
    };

    // Change the data in the database and capture respose
    let updateRequest = await this.usersService.updateUserInfo(null, {password: this.password.value });
    // The return should be the updated user. If there's no username, something went wrong
    if(isUndefined(updateRequest.username)) {
      this.snackBar.open('Something went wrong...', 'dismiss', {duration: 3000});
    }else {
      this.usersService.getUser(this.usersService.mainUser.token);
      this.snackBar.open('Successful update!', 'dismiss', {duration: 3000})
    };

    this.snackBar.open('Your password has been changed!', 'dismiss', {duration: 3000});
    this.dialogRef.close();
  }
  getErrorMessage(field: string) {
    switch(field) {
      case "password":
        return this.password.hasError('pattern') ? 'Password is missing something' : '';
      case "passwordConfirm":
        return this.passwordConfirm.hasError('pattern') ? 'This password is missing something' : '';
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
