import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.css']
})
export class UserEditFormComponent implements OnInit {

  userID = new FormControl('', [Validators.required]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  site = new FormControl('', [Validators.required]);
  selectedClinic: string;

  sites = [{value: 1, text: 'Site One'}, {value: 2, text: 'Site Two'}, {value:3, text: 'Site Three'}]
  
  clinics = [{value: 1, text: 'Mental Health'}, {value: 2, text: 'Physical Medicine'}]

  constructor() { }

  ngOnInit() {
  }

  getErrorMessage(field:string):string {
    const blankMessage = 'this field cannot be left blank';
    switch(field) {
      case 'userID':
        return this.userID.hasError('required') ? blankMessage : '';
      case 'firstName':
        return this.firstName.hasError('required') ? blankMessage : '';
      case 'lastName':
        return this.lastName.hasError('required') ? blankMessage : '';
      case 'username':
        return this.username.hasError('required') ? blankMessage : '';
      };
    };

  onSubmit() {
    console.log(this.selectedClinic);
  }
}
