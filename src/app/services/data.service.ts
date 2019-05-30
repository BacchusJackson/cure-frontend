import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { UsersService } from './users.service';
import { sanitizeScript } from '@angular/core/src/sanitization/sanitization';
import { getSupportedInputTypes } from '@angular/cdk/platform';

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

  // GET all sites
  getSites() {
    const sites = [
      {name: 'Wing', clinics: ['Mental Health', 'Physical Medicine']},
      {name: 'Beale', clinics: ['Mental Health', 'Physical Medicine']},
      {name: 'Ft. Gordon', clinics: ['Mental Health', 'Physical Medicine']},
      {name: 'Langley', clinics: ['Mental Health', 'Physical Medicine']},
      {name: 'Korea', clinics: ['Mental Health', 'Physical Medicine']},
      {name: 'Ramstein', clinics: ['Mental Health', 'Physical Medicine']},
      {name: 'Hawaii', clinics: ['Mental Health', 'Physical Medicine']},
  ];
  
    return sites;
    // return await this.http.get<sites[]>(environment.apiURL + '/sites', this.httpOptions).toPromise();
  }
}


export interface Activity {
  _id: string;
  name: string;
  category: string;
  properties: [];
};

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
};