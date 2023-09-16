import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from './services/AuthInterceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { signUp } from './models/signup-model';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    LoginComponent,
    SignupComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: "login", component: LoginComponent},
      {path: "signup", component: SignupComponent},
      {path: "Books", component: BookComponent, canActivate: [AuthGuard]}
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
