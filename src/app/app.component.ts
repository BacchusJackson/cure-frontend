import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private usersService: UsersService, 
    private router: Router,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit() {

    if(this.usersService.goodToken) {
      this.usersService.getUser(localStorage.getItem('token'));
      this.router.navigate(['entry']);
    } else {
      this.router.navigate([''])
    }
  }
}
