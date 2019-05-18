import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  firstName = new FormControl('', [Validators.required])
  lastName = new FormControl('', [Validators.required ])
  username = new FormControl('', [Validators.required])

  constructor(private router:Router) { }

  ngOnInit() {
  }

  getErrorMessage(field:String):string{
    switch(field) {
      case 'firstName':
        return this.firstName.hasError('required') ? 'This field cannot be left blank' : ''
      case 'lastName':
        return this.lastName.hasError('required') ? 'This field cannot be left blank' : ''
      case 'username': 
        return this.username.hasError('required') ? 'this field cannot be left blank' : ''
    }
  }

  onSubmit() {

    console.log('Submit clicked');
  }

  onClear() { 
    this.firstName.reset()
    this.lastName.reset()
    this.username.reset()
  }
}
