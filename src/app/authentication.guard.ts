import { Injectable } from '@angular/core';
import { UsersService } from './services/users.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private usersService: UsersService, private router:Router){}

  canActivate() {

    if(this.usersService.goodToken) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
