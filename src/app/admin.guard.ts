import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements  CanActivate{
  constructor(private router: Router){}

  canActivate() {
    this.router.navigate(['/unauthorized']);
    return false;
  }
}

/*
TODO:
- Check the user for admin privilages
- Create Admin account for testing
*/
