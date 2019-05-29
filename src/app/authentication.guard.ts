import { Injectable } from '@angular/core';
import { UsersService } from './services/users.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private usersService: UsersService, private router:Router){}

  canActivate() {

    // Check for a good token and load the user into the global space
    if(this.usersService.goodToken) {
      this.usersService.getUser(localStorage.getItem('token'));
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
  
}