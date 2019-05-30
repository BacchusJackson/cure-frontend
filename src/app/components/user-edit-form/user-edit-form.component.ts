import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { AdminUsersService } from "src/app/services/admin-users.service";
import { MatSnackBar } from "@angular/material";
import { isUndefined } from 'util';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: "app-user-edit-form",
  templateUrl: "./user-edit-form.component.html",
  styleUrls: ["./user-edit-form.component.css"]
})
export class UserEditFormComponent implements OnInit {
  
  constructor(
    private router: Router,
    private adminUsersService: AdminUsersService,
    private snackBar: MatSnackBar,
    private dataService: DataService
  ) {}

  userID = new FormControl("", [Validators.required]);
  firstName = new FormControl("", [Validators.required]);
  lastName = new FormControl("", [Validators.required]);
  username = new FormControl("", [Validators.required]);
  site = new FormControl("", [Validators.required]);

  sites = this.dataService.getSites();
  clinics = ['Mental Health', 'Physical Medicine'];
  statuses = ['standard', 'admin'];

  selectedClinic: string;
  selectedSite: string;
  selectedStatus: string;

  // Used to set the input fields as visible or not
  userLoaded: Boolean = false;
  attemptedValue = '';

  ngOnInit() {
    // Watch the userID field, if it hits length 24 then load a user
    this.userID.valueChanges.subscribe(value => {
      if (value.length == 24 && this.attemptedValue != value) {
        this.attemptedValue = value;
        this.userID.disable();
        this.loadUser(value);

      }
    });
  }

  async loadUser(userID) {
    const user = await this.adminUsersService.getUser(userID);
    if (!user) {
      this.userLoaded = false;
      this.snackBar.open("User not found... Check ID", "dismiss", {
        duration: 3000 });
        this.userID.enable();
    } else {
      this.firstName.setValue(user.firstName);
      this.lastName.setValue(user.lastName);
      this.username.setValue(user.username);
      this.selectedClinic = user.clinic || '';
      this.selectedSite = user.site || '';
      this.selectedStatus = user.status || '';
      // Show the other fields on the form
      this.userLoaded = true;
    }
  }

  getErrorMessage(field: string): string {
    const blankMessage = "this field cannot be left blank";
    switch (field) {
      case "userID":
        return this.userID.hasError("required") ? blankMessage : "";
      case "firstName":
        return this.firstName.hasError("required") ? blankMessage : "";
      case "lastName":
        return this.lastName.hasError("required") ? blankMessage : "";
      case "username":
        return this.username.hasError("required") ? blankMessage : "";
    }
  }

  // TODO: fix site and clinic generation after loading id
  async onSubmit() {
    if(this.userID.invalid || this.firstName.invalid || this.lastName.invalid || this.username.invalid) {
      this.snackBar.open('You forgot something...', 'dismiss', {duration: 3000});
      return false;
    };

    const userEditInfo = {
      id: this.userID.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      username: this.username.value,
      site: this.selectedSite,
      clinic: this.selectedClinic,
      status: this.selectedStatus
    };
    let updateRequest = await this.adminUsersService.updateUserInfo(userEditInfo);

    if(isUndefined(updateRequest.username)) {
      this.snackBar.open('Something went wrong...', 'dismiss', {duration: 3000});
    }else {
      this.snackBar.open('Successful Update!', 'dismiss', {duration: 2000});
      this.router.navigate(['/manageUsers']);
    }
  }

  async onDelete() {

    // Pop up menu to confirm deletion
    let confirmation = confirm("Are you sure you want to delete this user?");
    if(!confirmation) {return false };
    const deleteRequest = await this.adminUsersService.deleteUser(this.userID.value);
    this.snackBar.open('User Successfully Deleted', 'dismiss', {duration: 3000});
    this.router.navigate(['manageUsers']);
  }
}
