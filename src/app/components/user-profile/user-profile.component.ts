import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  displayName = new FormControl('', [Validators.required]);

  constructor(private usersService:UsersService) { }

  ngOnInit() {
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

  onSubmit() {
    console.log("Saved!");
  }
}
