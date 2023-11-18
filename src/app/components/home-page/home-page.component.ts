import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TankService } from 'src/app/services/tank.service';
import { Tank } from 'src/app/types/tank';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  private authSubscription!: Subscription;
  public isAuth: boolean = false;
  private idOfFishTankViewing: string | null | undefined;
  protected tankUserIsViewing: Tank | undefined;
  private tankSubscription$ = new Subscription();
  protected loading: boolean = true;
  protected tanks: Tank[] = [];

  constructor(
    protected authService: AuthService,
    private tankService: TankService
  ) {}
  ngOnInit(): void {
    this.loadTanks();
  }

  private loadTanks(): void {
    if (!this.authService.userId) {
      return;
    }
    this.tankSubscription$ = this.tankService
      .fetchTanksByUser(this.authService.userId)
      .subscribe((tanks: Tank[]) => {
        this.tanks = tanks;

        this.tankUserIsViewing = this.tankService.setTankUserIsViewing(tanks);
      });
  }

  ngOnDestroy(): void {
    this.tankSubscription$.unsubscribe();
  }
}
