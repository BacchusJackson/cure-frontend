import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsersService } from './services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements  CanActivate{
  constructor(private router: Router, private usersService: UsersService){}

  canActivate() {
    // If the token is good and the logged in user is admin, return true
    if(this.usersService.goodToken) {
      if(this.usersService.mainUser.status == 'admin') {
        return true;
      }
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}

/*
TODO:
- Check the user for admin privilages
- Create Admin account for testing
*/
