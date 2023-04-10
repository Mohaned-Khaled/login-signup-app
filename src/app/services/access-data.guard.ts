import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccessDataGuard implements CanActivate, OnDestroy {
  bol: boolean;
  authSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authSub = this.authService.isAuth.subscribe((bol) => {
      this.bol = bol;
    });

    if (this.bol) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
