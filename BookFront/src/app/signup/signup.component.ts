import { Component } from "@angular/core";
import { AuthService } from '../services/auth.service';
import { signUp } from "../models/signup-model";
import { signUpService } from "../services/signup.service";
import { catchError, of } from "rxjs";
import { Router } from '@angular/router';

@Component({
    selector: 'sign-form',
    templateUrl: './signUp.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  categories: string[] = [];
  selectedCategories: string[] = [];
  errorMessage = false;
  error : string = "";
  user: signUp = {
      Username: "",
      Password: "",
      Email: "",
      Role: "User",
      Id: 6,
      PrefferedCategories: []
    };

    constructor(private signup: signUpService, private router: Router) { }

    isValidEmail(email: string): boolean {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
    }

    isPasswordStrong(password: string): boolean {
      // Define the password strength criteria
      const minLength = 8;
      const hasUppercase = /[A-Z]/.test(password);
      const hasDigit = /[0-9]/.test(password);
    
      // Check if the password meets the criteria
      return (
        password.length >= minLength &&
        hasUppercase &&
        hasDigit
      );
    }

    
    async validate(): Promise<boolean> {
      this.errorMessage = false;
      this.error = "";
      let userExists = false;
  
      if (this.user.Username == "" || this.user.Password == "" || this.user.Email == "") {
        this.error = "All fields should be full!";
        this.errorMessage = true;
        return false;
      }

      if (this.user.Username.length < 5)
      {
        this.error = "Username at least 5 characters!";
        this.errorMessage = true;
        return false;
      }
      
      if (!this.isValidEmail(this.user.Email))
      {
        this.error = "Invalid Email!";
        this.errorMessage = true;
        return false;
      }

      if (!this.isPasswordStrong(this.user.Password))
      {
        this.error = "Password Criterias:\n at least 8 characters.\nContains an uppercase letter.\nContains a digit.";
        this.errorMessage = true;
        return false;
      }
      
      try {
        userExists = await this.signup.existing(this.user).toPromise() || false;
      } catch (error) {
        this.error = "Error checking if user exists: " + error;
        return false;
      }
  
      if (userExists) {
        this.error = "UserName already in use.";
        this.errorMessage = true;
        return false;
      }
  
      return true;
    }
  
    async onSubmit() {
    const isValid = await this.validate();

    if (isValid) {
      await this.signup.signUp(this.user).toPromise();
      this.router.navigate(['/login'], {
        queryParams: { user: JSON.stringify(this.user) }
      });
    }
  }
  }
    
  
