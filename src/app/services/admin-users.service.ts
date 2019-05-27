import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsersService, User } from "../services/users.service";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class AdminUsersService {
  constructor(private http: HttpClient, private usersService: UsersService ) {}

  async getUser(userID: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.usersService.mainUser.token
      })
    };

    return await this.http.get<User>(environment.apiURL + '/users/id/' + userID, httpOptions).toPromise()
  }
}