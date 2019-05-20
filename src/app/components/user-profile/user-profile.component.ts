import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material';
import { isUndefined } from 'util';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  displayName = new FormControl('', [Validators.required]);

  constructor(private usersService:UsersService, private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.firstName.setValue(this.usersService.mainUser.firstName);
    this.lastName.setValue(this.usersService.mainUser.lastName)
    this.displayName.setValue(this.usersService.mainUser.displayName)

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
      if(isUndefined(updateRequest.username)) {
        this.snackBar.open('Something went wrong...', 'dismiss', {duration: 3000});
      }else {
        this.snackBar.open('Successful update!', 'dismiss', {duration: 3000})
      };

      this.usersService.getUser(this.usersService.mainUser.token);
      console.log(this.usersService.mainUser);
      this.snackBar.open('New Information Saved!', 'dismiss', {duration: 2000})
    }
  }
}
