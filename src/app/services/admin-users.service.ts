import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsersService, User } from "../services/users.service";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class AdminUsersService {
  constructor(private http: HttpClient, private usersService: UsersService ) {}

  standardHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.usersService.mainUser.token
    })
  }

  // GET a specific user by ID
  async getUser(userID: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.usersService.mainUser.token
      })
    };

    return await this.http.get<User>(environment.apiURL + '/users/id/' + userID, httpOptions).toPromise()
  }

  // PUT update another users information
  async updateUserInfo(updatedUserInfo: {id: string, firstName: string, lastName: string, username: string}) {
    
    return await this.http.put<User>(environment.apiURL + '/users/' + updatedUserInfo.id, updatedUserInfo, this.standardHttpOptions).toPromise()
  }
}