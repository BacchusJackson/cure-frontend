import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatSnackBar } from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public firstName: string;
  public mainUser: User;
  public userLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient, private snackbar:MatSnackBar) { }

  async signIn(userInfo: {username: string, password: string}): Promise<Response> {
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return await this.http.post<Response>(environment.apiURL + '/signIn', userInfo, httpOptions).toPromise()
  
  }

  // PUT Request
  async updateUserInfo(updatedUserInfo?: {firstName:string, lastName:string, displayName:string, password?:string}, passwordOnly?:{password: string}) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.mainUser.token
      })
    }

    if(updatedUserInfo) {
      return await this.http.put<User>(environment.apiURL + '/users/' + this.mainUser.id, updatedUserInfo, httpOptions).toPromise()
    } else if(passwordOnly) {
      return await this.http.put<User>(environment.apiURL + '/users/' + this.mainUser.id, passwordOnly, httpOptions).toPromise()
    }
  }

  // Load the user into the global space
  getUser(userToken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken
      })
  };
  const jwtHelper = new JwtHelperService();

  // Decode the web token and get the id
  const decodedToken: DecodedToken = jwtHelper.decodeToken(userToken);
  
  // Get request with the id
  this.http.get<User>(environment.apiURL + '/users/id/' + decodedToken.userID, httpOptions).toPromise()
  .then((response) => {
    this.mainUser = response;
    this.mainUser.id = decodedToken.userID;
    this.mainUser.token = userToken;
    localStorage.setItem('token', userToken);
    this.userLoggedIn.next(true);
  })
  .catch((err) => {
    console.log('UNHANDLED SERVER ERROR: ' + err)
    this.snackbar.open('The was an error in retrieving user information... Please try reloading the page', 'dismiss', {duration:5000})
  })

  };

  async getAllUsers(userToken: string): Promise<User[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken
      })
    }

    return await this.http.get<User[]>(environment.apiURL + '/users/', httpOptions).toPromise()
  }
  get isLoggedIn(): Observable<boolean>{
    return this.userLoggedIn.asObservable();
  }

  logout() {
    this.mainUser = null;
    this.userLoggedIn.next(false);
    localStorage.clear();
  }
}
export interface Response {
  expiresIn: number;
  accessToken: string;
  errorMessage?: string;
};

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  displayName: string;
  site: string;
  clinic: string;
  status: string;
  token?: string;

}

interface DecodedToken {
  userID: string;
  iat:number;
  exp: string;
}