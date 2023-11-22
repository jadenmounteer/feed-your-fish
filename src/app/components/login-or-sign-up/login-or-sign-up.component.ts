import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IconService } from 'src/app/services/icon.service';
import { Router } from '@angular/router';

import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-or-sign-up',
  templateUrl: './login-or-sign-up.component.html',
  styleUrls: ['./login-or-sign-up.component.scss'],
})
export class LoginOrSignUpComponent implements OnInit {
  @Input() newUser: boolean = false;
  @Input() navigateUserAwayOnLogin: boolean = true;
  protected displayBadEmailMsg: boolean = false;
  protected displayEmailPendingApprovalMessage: boolean = false;
  protected displaySubmitRequestMessage: boolean = false;
  protected displayLoggedInMessage: boolean = false;
  protected emailSentMessage: string = '';
  protected emailExistsMessage: string = '';
  protected contentLoaded: boolean = false;
  protected signInErrorMessage: string = '';
  protected showPassword: boolean = false;
  protected forgotPassword: boolean = false;

  constructor(
    private authService: AuthService,
    public icon: IconService,
    private router: Router
  ) {
    this.contentLoaded = true;
  }

  ngOnInit(): void {}

  public onLogin(form: NgForm) {
    this.signInErrorMessage = '';

    this.authService
      .login({
        email: form.value.email,
        password: form.value.password,
      })
      .pipe(
        catchError((err) => {
          this.signInErrorMessage = err;
          return throwError(err);
        })
      )
      .subscribe(() => {
        this.displayLoggedInMessage = true;
      });
  }

  public async onSignUp(form: NgForm) {
    this.signInErrorMessage = '';

    this.authService
      .registerUser({
        email: form.value.email,
        password: form.value.password,
      })
      .pipe(
        catchError((err) => {
          this.displaySubmitRequestMessage = false;
          this.signInErrorMessage = err;
          return throwError(err);
        })
      )
      .subscribe((result) => {
        this.authService.createUserData(result.user, form.value.displayName);
        result.user.updateProfile({
          displayName: form.value.displayName,
        });
        this.authService.onSuccessfulAuthentication();
        this.displayLoggedInMessage = true;
      });
  }

  public switchToLoginOrSignUp(): void {
    this.newUser = !this.newUser;
  }

  protected toggleForgotPassword(): void {
    this.forgotPassword = !this.forgotPassword;
  }

  protected toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  protected sendResetPasswordEmail(form: NgForm): void {
    this.authService
      .forgotPassword(form.value.email)
      .then(() => {
        this.toggleForgotPassword();
        this.emailSentMessage = `An email has been sent to ${form.value.email} for you to reset your password. Please check your
        inbox.`;
      })
      .catch((error) => {
        window.alert(error);
      });
  }
}
