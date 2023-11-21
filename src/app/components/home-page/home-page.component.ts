import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FishService } from 'src/app/services/fish.service';
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
  protected tankUserIsViewing: Tank | undefined;
  private tankSubscription$ = new Subscription();
  protected loading: boolean = true;
  protected tanks: Tank[] = [];
  private tankViewingSubscription$ = new Subscription();
  protected showFishControls = false;

  constructor(
    protected authService: AuthService,
    private tankService: TankService,
    private fishService: FishService
  ) {}
  ngOnInit(): void {
    this.loadTanks();
    this.tankViewingSubscription$ =
      this.tankService.tankViewingChanged.subscribe((tank: Tank) => {
        this.tankUserIsViewing = tank;
      });
  }

  private loadTanks(): void {
    if (!this.authService.userId) {
      return;
    }
    this.tankSubscription$ = this.tankService
      .fetchTanksByUser(this.authService.userId)
      .subscribe((tanks: Tank[]) => {
        this.tanks = tanks;

        // Update fish status. This can be done on the backend or elsewhere in the future.
        tanks.forEach((tank) => {
          this.fishService.updateFishStatus(tank.fishes);
          this.tankService.updateTank(tank.id, tank);
        });

        this.tankUserIsViewing = this.tankService.setTankUserIsViewing(tanks);
      });
  }

  ngOnDestroy(): void {
    this.tankSubscription$.unsubscribe();
    this.tankViewingSubscription$.unsubscribe();
  }
}
