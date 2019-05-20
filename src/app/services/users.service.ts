import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public firstName: string;
  public mainUser: User;

  constructor(private http:HttpClient, private snackbar:MatSnackBar) { }

  async signIn(userInfo: {username: string, password: string}): Promise<Response> {
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return await this.http.post<Response>(environment.apiURL + '/signIn', userInfo, httpOptions).toPromise()
  
  }

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
  
  this.http.get<User>(environment.apiURL + '/users/id/' + decodedToken.userID, httpOptions).toPromise()
  .then((response) => {
    this.mainUser = response;
    this.mainUser.token = userToken;
  })
  .catch((err) => {
    console.log('UNHANDLED SERVER ERROR: ' + err)
    this.snackbar.open('The was an error in retrieving user information... Please try reloading the page', 'dismiss', {duration:5000})
  })

  };
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