import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { UsersService, User } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor(
    private router:Router,
    private snackBar:MatSnackBar,
    private usersService:UsersService
    ) { }

  ngOnInit() {

    // When ever a log in or out event is trigger, this will change the user
    this.usersService.userLoggedIn.subscribe(
      (userLoggedIn) => {
        if(userLoggedIn) {
          this.user = this.usersService.mainUser;
        }else {
          this.user = null;
        }
      },
      (err) => {
        if(err) throw err;
      }
    );
  }
  
  onLogoutClick(){
    this.usersService.logout();
    this.snackBar.open('See you next time!','dismiss', {duration:4000});
    this.router.navigate(['/'])
  }

}