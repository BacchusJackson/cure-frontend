import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { AdminUsersService } from 'src/app/services/admin-users.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
  
  displayColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'displayName', 'site', 'clinic', 'status'];
  dataSource: any;
  constructor(private adminUsersService: AdminUsersService) { }
  
  ngOnInit() {
    
    this.adminUsersService.getAllUsers()
    .then( (results) => {

        this.dataSource = new MatTableDataSource(results);
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


export interface users {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  displayName: string;
  site: string;
  clinic: string;
  status: string;
}