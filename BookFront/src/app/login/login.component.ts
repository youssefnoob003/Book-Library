import { Component } from "@angular/core";
import { AuthService } from '../services/auth.service';
import { user } from "../models/user-model";
import { concatMap } from 'rxjs/operators';
import { Router } from "@angular/router";

@Component({
    selector: 'auth-form',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    user: user = {
        Username: "",
        Password: ""
      };
    errorMessage: string = ''; 
    constructor(private authService: AuthService, private router: Router) { }
    
    onSubmit() {
      this.authService.login(this.user).pipe(
        concatMap(() => this.authService.getLinkWithToken())
      ).subscribe(
        (res: string) => {
          console.log(res); // Handle the string response from the GET request
          this.errorMessage = '';
          this.router.navigate(['/Books']);
        },
        (error: any) => {
           this.errorMessage = 'Invalid username or password.';
        }
      );

    }
}
