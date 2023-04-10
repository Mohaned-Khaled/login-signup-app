import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  @ViewChild('login') loginForm: NgForm;
  errorMsg: string;
  isLoading: boolean;
  authSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.isLoading = true;
    this.errorMsg = null;

    const { email, password } = this.loginForm.value;

    this.authSub = this.authService.emailLogin(email, password).subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;

        this.authService.storeToken(data.idToken);

        this.router.navigate(['dashboard']);
      },
      (error) => {
        this.isLoading = false;

        this.errorMsg = this.authService.handleError(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}
