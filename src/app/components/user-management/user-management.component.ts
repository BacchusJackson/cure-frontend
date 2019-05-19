import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  displayColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'displayName', 'site', 'clinic', 'status'];
  dataSource = new MatTableDataSource(userData);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

export interface users {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  displayName: string;
  site: string;
  clinic: string;
  status: string;
}

const userData: users[] = [
  {id: "00001", firstName: "Bill", lastName: 'Paxton', username: 'bill.paxton', displayName: 'Bill Paxton', site: 'Langley', clinic: 'Mental Health', status: 'standard'},
  {id: "00002", firstName: "Bill", lastName: 'Paxton', username: 'bill.paxton', displayName: 'Bill Paxton', site: 'Langley', clinic: 'Mental Health', status: 'standard'},
  {id: "00003", firstName: "Bill", lastName: 'Paxton', username: 'bill.paxton', displayName: 'Bill Paxton', site: 'Langley', clinic: 'Mental Health', status: 'standard'},
  {id: "00004", firstName: "Bill", lastName: 'Paxton', username: 'bill.paxton', displayName: 'Bill Paxton', site: 'Langley', clinic: 'Mental Health', status: 'Admin'},
  {id: "00005", firstName: "Bill", lastName: 'Paxton', username: 'bill.paxton', displayName: 'Bill Paxton', site: 'Langley', clinic: 'Mental Health', status: 'standard'},
  {id: "00005", firstName: "Bill", lastName: 'Paxton', username: 'bill.paxton', displayName: 'Bill Paxton', site: 'Langley', clinic: 'Mental Health', status: 'standard'},
  {id: "00005", firstName: "Bill", lastName: 'Paxton', username: 'bill.paxton', displayName: 'Bill Paxton', site: 'Langley', clinic: 'Mental Health', status: 'standard'},
  {id: "00005", firstName: "Bill", lastName: 'Paxton', username: 'bill.paxton', displayName: 'Bill Paxton', site: 'Langley', clinic: 'Mental Health', status: 'standard'},
  {id: "00005", firstName: "Bill", lastName: 'Paxton', username: 'bill.paxton', displayName: 'Bill Paxton', site: 'Langley', clinic: 'Mental Health', status: 'standard'},
  {id: "00005", firstName: "Bill", lastName: 'Paxton', username: 'bill.paxton', displayName: 'Bill Paxton', site: 'Langley', clinic: 'Mental Health', status: 'standard'},
  {id: "00005", firstName: "Bill", lastName: 'Paxton', username: 'bill.paxton', displayName: 'Bill Paxton', site: 'Langley', clinic: 'Mental Health', status: 'standard'},
  {id: "00005", firstName: "Bill", lastName: 'Paxton', username: 'bill.paxton', displayName: 'Bill Paxton', site: 'Langley', clinic: 'Mental Health', status: 'standard'},
  {id: "00005", firstName: "Bill", lastName: 'Paxton', username: 'bill.paxton', displayName: 'Bill Paxton', site: 'Langley', clinic: 'Mental Health', status: 'standard'},
  {id: "00005", firstName: "Bill", lastName: 'Paxton', username: 'bill.paxton', displayName: 'Bill Paxton', site: 'Langley', clinic: 'Mental Health', status: 'standard'},
  {id: "00005", firstName: "Bill", lastName: 'Paxton', username: 'bill.paxton', displayName: 'Bill Paxton', site: 'Langley', clinic: 'Mental Health', status: 'standard'},
  {id: "00005", firstName: "Bill", lastName: 'Paxton', username: 'bill.paxton', displayName: 'Bill Paxton', site: 'Langley', clinic: 'Mental Health', status: 'standard'},

]