import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  
  username = new FormControl('', [Validators.required])
  password = new FormControl('', [Validators.required])

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  getErrorMessage(field: String) {
    
    if(field == "username"){
      // if there is an error, return the message, if not return blank
      return this.username.hasError('required') ? 'This field cannot be blank' : '';
    }else if (field == "password") {
      return this.password.hasError('required') ? 'This field cannot be blank' : '';
    }

  };

  onSubmit() {
    if(this.username.valid && this.password.valid) {
      console.log("Submit");
    }else {
      this.snackBar.open('You missed something...', 'dismiss', {duration:2000});
    }
  }
}