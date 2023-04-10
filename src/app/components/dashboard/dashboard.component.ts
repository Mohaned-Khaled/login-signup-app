import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  localId: string;
  tokenSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');

    this.tokenSub = this.authService.getDetails(token).subscribe((data) => {
      this.localId = data.users[0].localId;
    });
  }

  ngOnDestroy(): void {
    this.tokenSub.unsubscribe();
  }
}
