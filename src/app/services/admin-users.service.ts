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
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  //Get a specific user by username
  async getUserByUsername(username: string) {
    return await this.http.get<User>(environment.apiURL + '/users/username/' + username, this.standardHttpOptions).toPromise();
  };

  // GET a specific user by ID
  async getUser(userID: string) {
    return await this.http.get<User>(environment.apiURL + '/users/id/' + userID, this.standardHttpOptions).toPromise()
  };

  async getAllUsers() {

    return await this.http.get<User[]>(environment.apiURL + '/users/', this.standardHttpOptions).toPromise()
  };

  // PUT update another users information
  async updateUserInfo(updatedUserInfo: UserUpdate) {
    
    return await this.http.put<User>(environment.apiURL + '/users/' + updatedUserInfo.id, updatedUserInfo, this.standardHttpOptions).toPromise()
  };

  // POST add a new user
  async createUser(userInfo: {firstName: string, lastName: string, username: string, password: string}) {

    return await this.http.post<User>(environment.apiURL + '/users/', userInfo, this.standardHttpOptions).toPromise();
  };

  async deleteUser(userID): Promise<User> {
    
    return await this.http.delete<User>(environment.apiURL + '/users/' + userID, this.standardHttpOptions).toPromise();
  }
}

export interface UserUpdate {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  clinic: string;
  site: string;
  status: string;
}