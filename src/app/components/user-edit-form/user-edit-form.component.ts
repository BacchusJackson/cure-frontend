import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { UsersService } from "../../services/users.service";
import { AdminUsersService } from "src/app/services/admin-users.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-user-edit-form",
  templateUrl: "./user-edit-form.component.html",
  styleUrls: ["./user-edit-form.component.css"]
})
export class UserEditFormComponent implements OnInit {
  userID = new FormControl("", [Validators.required]);
  firstName = new FormControl("", [Validators.required]);
  lastName = new FormControl("", [Validators.required]);
  username = new FormControl("", [Validators.required]);
  site = new FormControl("", [Validators.required]);
  selectedClinic: string;

  // Used to set the input fields as visible or not
  userLoaded: Boolean = false;
  attemptedValue = '';

  sites = [
    { value: 1, text: "Site One" },
    { value: 2, text: "Site Two" },
    { value: 3, text: "Site Three" }
  ];

  clinics = [
    { value: 1, text: "Mental Health" },
    { value: 2, text: "Physical Medicine" }
  ];

  constructor(
    private usersService: UsersService,
    private adminUsersService: AdminUsersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
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

  onSubmit() {
    // TODO: Add actual database service
    console.log('Submitted!');
  }
}
