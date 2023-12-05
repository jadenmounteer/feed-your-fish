import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FishService } from 'src/app/services/fish.service';
import { TankService } from 'src/app/services/tank.service';
import { Tank } from 'src/app/types/tank';
import { transition, style, animate, trigger } from '@angular/animations';

const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate(
    '.08s ease-in',
    style({
      opacity: 0.1,
    })
  ),
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate(
    '.08s ease-out',
    style({
      opacity: 0,
    })
  ),
]);

const fadeIn = trigger('fadeIn', [enterTransition]);

const fadeOut = trigger('fadeOut', [leaveTrans]);

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [fadeIn, fadeOut],
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

        this.makeFishSwimAround();
      });
  }

  private makeFishSwimAround(): void {
    this.tankUserIsViewing?.fishes.forEach((fish) => {
      if (fish.fishStatus !== 'Dead') {
        fish.swimmingDirection =
          this.fishService.chooseRandomDirectionToSwimIn();

        fish.swimmingSpeed = this.fishService.chooseRandomSpeed();

        fish.xPosition = this.fishService.initializeXPosition(
          fish.swimmingDirection
        );

        fish.yPosition = this.fishService.initializeYPosition(
          fish.swimmingDirection
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.tankSubscription$.unsubscribe();
    this.tankViewingSubscription$.unsubscribe();
  }
}
