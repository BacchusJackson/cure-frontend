import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private usersService:UsersService, private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  // GET all activities
  async getActivities() {
    console.log(localStorage.getItem('token'));
    return await this.http.get<Activity[]>(environment.apiURL + '/activities', this.httpOptions).toPromise();
  }

  // POST entry
  async addEntry(entry:Entry) {
    return await this.http.post<Entry>(environment.apiURL + '/entries', entry, this.httpOptions).toPromise();
  }

  // GET all submitted entries
  async getEntries() {
    return await this.http.get<Entry[]>(environment.apiURL +'/entries', this.httpOptions).toPromise();
  }
}

export interface Activity {
  _id: string;
  name: string;
  category: string;
  properties: [];
}

export interface Entry {
  _id?: string;
  activityID: string;
  activity: string;
  category: string;
  creator: string;
  dateEntered: Date;
  dateCreated: Date;
  site: string;
  clinic: string;
  userStatus: string;
  hours?: number;
  members?: number;
  description?: string;
}