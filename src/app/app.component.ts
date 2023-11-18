import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'feed-your-fish';
  public isAuth: boolean = false;

  constructor(protected authService: AuthService) {}
  ngOnInit(): void {
    this.authService.iniAuthListener();
  }

  ngOnDestroy(): void {}
}
