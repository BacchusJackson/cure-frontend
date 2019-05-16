import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: {username:String}
  isLoggedIn$: Observable<boolean>;
  userLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router:Router,
    private snackBar:MatSnackBar
    ) { }

  ngOnInit() {
    this.user = {username: 'Test User'};
    this.isLoggedIn$ = this.userLoggedIn;
    this.userLoggedIn.next(true);
  }

  get isLoggedIn(): Observable<boolean>{
    return this.userLoggedIn.asObservable();
  }
}