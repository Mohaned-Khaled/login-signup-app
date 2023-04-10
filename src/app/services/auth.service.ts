import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AuthState {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  isAuthenticated() {
    if (sessionStorage.getItem('token')) {
      this.isAuth.next(true);
    }
  }

  emailRegister(name: string, email: string, password: string) {
    return this.http.post<AuthState>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBdHeXDlImWJN3XtqxCn9YPa8qJXW5TchQ',
      {
        name,
        email,
        password,
        returnSecureToken: true,
      }
    );
  }

  emailLogin(email: string, password: string) {
    return this.http.post<AuthState>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBdHeXDlImWJN3XtqxCn9YPa8qJXW5TchQ',
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }

  getDetails(token: string) {
    return this.http.post<any>(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBdHeXDlImWJN3XtqxCn9YPa8qJXW5TchQ',
      {
        idToken: token,
      }
    );
  }

  storeToken(token: string) {
    sessionStorage.setItem('token', token);

    this.isAuth.next(true);
  }

  removeToken() {
    sessionStorage.removeItem('token');
  }

  handleError(errorMsg: HttpErrorResponse) {
    switch (errorMsg.error.error.message) {
      case 'EMAIL_EXISTS':
        return 'The email address is already in use by another account';
      case 'EMAIL_NOT_FOUND':
        return 'There is no user record corresponding to this identifier. The user may have been deleted.';
      case 'INVALID_PASSWORD':
        return 'The password is invalid or the user does not have a password.';
      default:
        return 'Unkown error';
    }
  }
}
