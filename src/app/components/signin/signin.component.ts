import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { UsersService } from "../../services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  username = new FormControl("", [Validators.required]);
  password = new FormControl("", [Validators.required]);

  constructor(
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    private router: Router,
  ) {}

  ngOnInit() {}

  getErrorMessage(field: String) {
    if (field == "username") {
      // if there is an error, return the message, if not return blank
      return this.username.hasError("required")
        ? "This field cannot be blank"
        : "";
    } else if (field == "password") {
      return this.password.hasError("required")
        ? "This field cannot be blank"
        : "";
    }
  }

  async onSubmit() {
    if (this.username.valid && this.password.valid) {
      const signInResponse = await this.usersService.signIn({
        username: this.username.value,
        password: this.password.value
      });

      if (signInResponse.errorMessage) {
        this.snackBar.open(signInResponse.errorMessage, "dismiss", {
          duration: 2000
        });
      } else {
        // Load the user into the global space (userservice mainUser)
        this.usersService.getUser(signInResponse.accessToken);

        this.snackBar.open("Welcome Back!", "dismiss", { duration: 2000 });
        this.router.navigate(["/entry"]);
      }
    } else {
      this.snackBar.open("You missed something...", "dismiss", {
        duration: 2000
      });
    }
  }
}
