import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  private authSubscription!: Subscription;
  public loading: boolean = true;

  constructor(protected authService: AuthService) {}
  ngOnInit(): void {
    this.authService.iniAuthListener();

    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
