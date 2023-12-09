import { Component, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FishService } from 'src/app/services/fish.service';
import { TankService } from 'src/app/services/tank.service';
import { Tank } from 'src/app/types/tank';
import { transition, style, animate, trigger } from '@angular/animations';
import { Fish } from 'src/app/types/fish';

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
  selector: 'app-fish-tank',
  templateUrl: './fish-tank.component.html',
  styleUrls: ['./fish-tank.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class FishTankComponent {
  private authSubscription!: Subscription;
  public isAuth: boolean = false;
  protected tankUserIsViewing: Tank | undefined;
  private tankSubscription$ = new Subscription();
  protected loading: boolean = true;
  protected tanks: Tank[] = [];
  private tankViewingSubscription$ = new Subscription();
  protected showFishControls = false;
  protected screenHeight!: number;
  protected screenWidth!: number;

  constructor(
    protected authService: AuthService,
    private tankService: TankService,
    private fishService: FishService
  ) {
    this.onResize(event);
  }
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
        this.changeDirection(fish);

        fish.xPosition = this.fishService.initializeXPosition(
          fish.swimmingDirection,
          this.screenWidth
        );

        fish.yPosition = this.fishService.initializeYPosition(
          fish.swimmingDirection,
          this.screenHeight
        );

        let intervalSpeed: number = this.getRandomIntervalSpeed();

        // Make the fish swim
        let fishTooFarLeft = false;
        let fishTooFarRight = false;
        let fishTooFarUp = false;
        let fishTooFarDown = false;
        setInterval(() => {
          fishTooFarLeft = this.fishService.fishTooFarLeft(
            fish,
            this.screenWidth
          );
          fishTooFarRight = this.fishService.fishTooFarRight(
            fish,
            this.screenWidth
          );
          fishTooFarUp = this.fishService.fishTooFarUp(fish, this.screenHeight);
          fishTooFarDown = this.fishService.fishTooFarDown(
            fish,
            this.screenHeight
          );

          if (fish.swimmingDirection === 'swim-left' && !fishTooFarLeft) {
            this.fishService.swimLeft(fish);
          } else if (
            fish.swimmingDirection === 'swim-right' &&
            !fishTooFarRight
          ) {
            this.fishService.swimRight(fish);
          } else if (
            fish.swimmingDirection === 'swim-up-left' &&
            !fishTooFarLeft &&
            !fishTooFarUp
          ) {
            this.fishService.swimUpLeft(fish);
          } else if (
            fish.swimmingDirection === 'swim-up-right' &&
            !fishTooFarRight &&
            !fishTooFarUp
          ) {
            this.fishService.swimUpRight(fish);
          } else if (
            fish.swimmingDirection === 'swim-down-left' &&
            !fishTooFarLeft &&
            !fishTooFarDown
          ) {
            this.fishService.swimDownLeft(fish);
          } else if (
            fish.swimmingDirection === 'swim-down-right' &&
            !fishTooFarRight &&
            !fishTooFarDown
          ) {
            this.fishService.swimDownRight(fish);
          } else {
            this.fishService.standStill(fish);
          }
        }, 1);

        // Randomly change directions
        setInterval(() => {
          intervalSpeed = this.getRandomIntervalSpeed();
          this.changeDirection(fish);
        }, intervalSpeed);
      }
    });
  }

  private getRandomIntervalSpeed(): number {
    // return random number between 1 and 5 seconds
    return Math.floor(Math.random() * 5000) + 1000;
  }

  private changeDirection(fish: Fish): void {
    fish.swimmingDirection = this.fishService.chooseRandomDirectionToSwimIn();

    fish.swimmingSpeed = this.fishService.chooseRandomSpeed();
  }

  ngOnDestroy(): void {
    this.tankSubscription$.unsubscribe();
    this.tankViewingSubscription$.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    console.log(this.screenHeight);
    console.log(this.screenWidth);
  }
}
