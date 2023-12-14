import { Component, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FishService } from 'src/app/services/fish.service';
import { TankService } from 'src/app/services/tank.service';
import { Tank } from 'src/app/types/tank';
import { transition, style, animate, trigger } from '@angular/animations';
import { Fish, FishAnimationData } from 'src/app/types/fish';
import { EmojiService } from 'src/app/services/emoji.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FishStatsModalComponent } from '../fish-stats-modal/fish-stats-modal.component';
import { AddFishModalComponent } from '../add-fish-modal/add-fish-modal.component';
import { IconService } from 'src/app/services/icon.service';

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
  protected hungryEmoji: string = this.emojiService.generateRandomHungryEmoji();
  protected happyEmoji: string = this.emojiService.generateRandomHappyEmoji();
  // TODO this can be a directive
  protected viewingButtons: boolean = false;
  protected clearButtonsTimeout: any;

  constructor(
    protected authService: AuthService,
    private modalService: NgbModal,
    private tankService: TankService,
    private fishService: FishService,
    private emojiService: EmojiService,
    protected iconService: IconService
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

  protected toggleViewingButtons(): void {
    if (!this.viewingButtons) {
      this.viewingButtons = true;
      this.setClearButtonsTimeout();
      return;
    }

    clearTimeout(this.clearButtonsTimeout);
    this.setClearButtonsTimeout();
  }

  private setClearButtonsTimeout(): void {
    this.clearButtonsTimeout = setTimeout(() => {
      this.viewingButtons = false;
    }, 10000);
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
      } else {
        fish.xPosition = this.screenWidth / 2;
        fish.yPosition = 0;
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

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.toggleViewingButtons();
  }

  protected addFish(): void {
    const modalRef = this.modalService.open(AddFishModalComponent);
    modalRef.componentInstance.tank = this.tankUserIsViewing;
  }

  // TODO move these methods to their own fish component
  protected showFishStats(fish: Fish): void {
    const modalRef = this.modalService.open(FishStatsModalComponent);
    modalRef.componentInstance.fish = fish;
    modalRef.result.then((result) => {
      if (result === 'fed') {
        this.onFishFed(fish);
      } else if (result === 'flushed') {
        this.onFishFlushed(fish);
      }
    });
  }

  protected onFishFed(fish: Fish): void {
    if (!this.tankUserIsViewing) {
      return;
    }
    this.tankService.updateTank(
      this.tankUserIsViewing.id,
      this.tankUserIsViewing
    );
  }

  protected onFishFlushed(fish: Fish): void {
    if (!this.tankUserIsViewing) {
      return;
    }
    this.tankUserIsViewing.fishes = this.tankService.deleteFishFromTank(
      fish,
      this.tankUserIsViewing.fishes
    );

    this.tankService.updateTank(
      this.tankUserIsViewing.id,
      this.tankUserIsViewing
    );
  }
}
