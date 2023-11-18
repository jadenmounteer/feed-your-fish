import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  private authSubscription!: Subscription;
  public isAuth: boolean = false;

  constructor(protected authService: AuthService) {}
  ngOnInit(): void {
    this.authService.iniAuthListener();

    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
