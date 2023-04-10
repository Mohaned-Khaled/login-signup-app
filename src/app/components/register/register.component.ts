import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, AuthState } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  errorMsg: string;
  isLoading: boolean;
  registerSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        this.uppercaseValidator,
        this.specialCharsValidator,
      ]),
    });
  }

  onRegister() {
    if (!this.registerForm.valid) return;

    const formsValues = this.registerForm.value;

    this.errorMsg = null;
    this.isLoading = true;
    this.registerSub = this.authService
      .emailRegister(formsValues.name, formsValues.email, formsValues.password)
      .subscribe(
        (data: AuthState) => {
          this.isLoading = false;

          this.authService.storeToken(data.idToken);

          this.router.navigate(['dashboard']);
        },
        (error: HttpErrorResponse) => {
          this.isLoading = false;

          this.errorMsg = this.authService.handleError(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.registerSub?.unsubscribe();
  }

  // Custom validator functions
  uppercaseValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const hasUppercase = /[A-Z]/.test(password);

    if (!hasUppercase) {
      return { uppercase: true };
    }

    return null;
  }

  specialCharsValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasSpecialChar) {
      return { specialChars: true };
    }
    return null;
  }
}
