import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SpriteComponent } from '../../sprite/sprite.component';
import {
  FishAnimation,
  FishAnimationData,
  SwimmingDirection,
  SwimmingSpeed,
} from 'src/app/types/fish';
import { FishService } from 'src/app/services/fish.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-goldfish',
  templateUrl: './goldfish.component.html',
  styleUrls: ['./goldfish.component.scss'],
})
export class GoldfishComponent
  extends SpriteComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  public override SPRITE_WIDTH = 96; // The total width in px divided by the number of columns
  public override SPRITE_HEIGHT = 96; // The total height in px divided by the total rows

  // Spritesheets from Piskel seem to not have a border or spacing
  public override BORDER_WIDTH: number = 0;
  public override SPACING_WIDTH: number = 0;

  public override canvas: any;
  public override context: any;
  spriteSheetURL = 'assets/sprites/Goldfish.png';
  public override frameIndex: number = 0;
  public override frame: any;
  public override image = new Image();
  private currentInterval: any;
  private currentAnimation: string = 'standStill';
  private fishAnimationSub$!: Subscription;

  @Input() canvasQuery: any;
  @Input() fishName: string | undefined = undefined;

  @ViewChild('sprite', { static: true }) goldfish: ElementRef | undefined;

  /*** Images ***/

  // Swimming left
  private goldfishSwimmingLeftTaleOut: any = this.spritePositionToImagePosition(
    0,
    0
  );
  private goldfishSwimmingLeftTaleTuckedIn: any =
    this.spritePositionToImagePosition(0, 1);
  private goldfishSwimmingLeftBlinkingTaleOut: any =
    this.spritePositionToImagePosition(0, 2);
  private goldfishSwimmingLeftBlinkingTaleIn: any =
    this.spritePositionToImagePosition(0, 3);
  private goldfishSwimmingLeftBubbles1: any =
    this.spritePositionToImagePosition(0, 4);
  private goldfishSwimmingLeftBubbles2: any =
    this.spritePositionToImagePosition(1, 0);
  private goldfishSwimmingLeftBubbles3: any =
    this.spritePositionToImagePosition(1, 1);

  // Swimming Right
  private goldfishSwimmingRightTaleOut: any =
    this.spritePositionToImagePosition(1, 2);
  private goldfishSwimmingRightTaleTuckedIn: any =
    this.spritePositionToImagePosition(1, 3);
  private goldfishSwimmingRightBlinkingTaleOut: any =
    this.spritePositionToImagePosition(1, 4);
  private goldfishSwimmingRightBlinkingTaleIn: any =
    this.spritePositionToImagePosition(2, 0);
  private goldfishSwimmingRightBubbles1: any =
    this.spritePositionToImagePosition(2, 1);
  private goldfishSwimmingRightBubbles2: any =
    this.spritePositionToImagePosition(2, 2);
  private goldfishSwimmingRightBubbles3: any =
    this.spritePositionToImagePosition(2, 3);

  // Swimming Up
  private goldfishSwimmingUpTaleOut: any = this.spritePositionToImagePosition(
    2,
    4
  );
  private goldfishSwimmingUpTaleTuckedIn: any =
    this.spritePositionToImagePosition(3, 0);
  private goldfishSwimmingUpBlinkingTaleOut: any =
    this.spritePositionToImagePosition(3, 1);
  private goldfishSwimmingUpBlinkingTaleIn: any =
    this.spritePositionToImagePosition(3, 2);

  // Swimming down
  private goldfishSwimmingDownTaleOut: any = this.spritePositionToImagePosition(
    3,
    3
  );
  private goldfishSwimmingDownTaleTuckedIn: any =
    this.spritePositionToImagePosition(3, 4);
  private goldfishSwimmingDownBlinkingTaleOut: any =
    this.spritePositionToImagePosition(4, 0);
  private goldfishSwimmingDownBlinkingTaleIn: any =
    this.spritePositionToImagePosition(4, 1);

  /*** ANIMATIONS ***/

  private swimmingLeftCycle: any = [
    this.goldfishSwimmingLeftTaleOut,
    this.goldfishSwimmingLeftTaleTuckedIn,
    this.goldfishSwimmingLeftTaleOut,
    this.goldfishSwimmingLeftTaleOut,
    this.goldfishSwimmingLeftTaleTuckedIn,
    this.goldfishSwimmingLeftTaleOut,
    this.goldfishSwimmingLeftBlinkingTaleIn,
    this.goldfishSwimmingLeftBlinkingTaleOut,
    this.goldfishSwimmingLeftTaleTuckedIn,
    this.goldfishSwimmingLeftTaleOut,
    this.goldfishSwimmingLeftTaleTuckedIn,
    this.goldfishSwimmingLeftTaleOut,
    this.goldfishSwimmingLeftTaleOut,
    this.goldfishSwimmingLeftTaleTuckedIn,
    this.goldfishSwimmingLeftTaleOut,
    this.goldfishSwimmingLeftBlinkingTaleIn,
    this.goldfishSwimmingLeftBlinkingTaleOut,
    this.goldfishSwimmingLeftTaleTuckedIn,
    this.goldfishSwimmingLeftBubbles1,
    this.goldfishSwimmingLeftBubbles2,
    this.goldfishSwimmingLeftBubbles3,
    this.goldfishSwimmingLeftTaleTuckedIn,
  ];

  private swimmingRightCycle: any = [
    this.goldfishSwimmingRightTaleOut,
    this.goldfishSwimmingRightTaleTuckedIn,
    this.goldfishSwimmingRightTaleOut,
    this.goldfishSwimmingRightTaleOut,
    this.goldfishSwimmingRightTaleTuckedIn,
    this.goldfishSwimmingRightTaleOut,
    this.goldfishSwimmingRightBlinkingTaleIn,
    this.goldfishSwimmingRightBlinkingTaleOut,
    this.goldfishSwimmingRightTaleTuckedIn,
    this.goldfishSwimmingRightTaleOut,
    this.goldfishSwimmingRightTaleTuckedIn,
    this.goldfishSwimmingRightTaleOut,
    this.goldfishSwimmingRightTaleOut,
    this.goldfishSwimmingRightTaleTuckedIn,
    this.goldfishSwimmingRightTaleOut,
    this.goldfishSwimmingRightBlinkingTaleIn,
    this.goldfishSwimmingRightBlinkingTaleOut,
    this.goldfishSwimmingRightTaleTuckedIn,
    this.goldfishSwimmingRightBubbles1,
    this.goldfishSwimmingRightBubbles2,
    this.goldfishSwimmingRightBubbles3,
    this.goldfishSwimmingRightTaleTuckedIn,
  ];

  private swimmingUpCycle: any = [
    this.goldfishSwimmingUpTaleOut,
    this.goldfishSwimmingUpTaleTuckedIn,
    this.goldfishSwimmingUpTaleOut,
    this.goldfishSwimmingUpTaleOut,
    this.goldfishSwimmingUpTaleTuckedIn,
    this.goldfishSwimmingUpTaleOut,
    this.goldfishSwimmingUpBlinkingTaleIn,
    this.goldfishSwimmingUpBlinkingTaleOut,
    this.goldfishSwimmingUpTaleTuckedIn,
    this.goldfishSwimmingUpTaleOut,
    this.goldfishSwimmingUpTaleTuckedIn,
    this.goldfishSwimmingUpTaleOut,
    this.goldfishSwimmingUpTaleOut,
    this.goldfishSwimmingUpTaleTuckedIn,
    this.goldfishSwimmingUpTaleOut,
    this.goldfishSwimmingUpBlinkingTaleIn,
    this.goldfishSwimmingUpBlinkingTaleOut,
    this.goldfishSwimmingUpTaleTuckedIn,
  ];

  private swimmingDownCycle: any = [
    this.goldfishSwimmingDownTaleOut,
    this.goldfishSwimmingDownTaleTuckedIn,
    this.goldfishSwimmingDownTaleOut,
    this.goldfishSwimmingDownTaleOut,
    this.goldfishSwimmingDownTaleTuckedIn,
    this.goldfishSwimmingDownTaleOut,
    this.goldfishSwimmingDownBlinkingTaleIn,
    this.goldfishSwimmingDownBlinkingTaleOut,
    this.goldfishSwimmingDownTaleTuckedIn,
    this.goldfishSwimmingDownTaleOut,
    this.goldfishSwimmingDownTaleTuckedIn,
    this.goldfishSwimmingDownTaleOut,
    this.goldfishSwimmingDownTaleOut,
    this.goldfishSwimmingDownTaleTuckedIn,
    this.goldfishSwimmingDownTaleOut,
    this.goldfishSwimmingDownBlinkingTaleIn,
    this.goldfishSwimmingDownBlinkingTaleOut,
    this.goldfishSwimmingDownTaleTuckedIn,
  ];

  /*** SPEEDS ***/
  private swimmingSpeed: number = 200;

  constructor(private fishService: FishService) {
    super();
  }
  ngOnDestroy(): void {
    this.fishAnimationSub$.unsubscribe();
  }

  ngOnInit(): void {
    this.swimLeft();

    // TODO All of this animation logic can be in the Sprite class to be shareable by each fish type.
    this.fishAnimationSub$ = this.fishService.animationChangeEmitter.subscribe(
      (animationData: FishAnimationData) => {
        if (!this.handleNewAnimation(animationData)) {
          return;
        }
        this.currentAnimation = animationData.fishAnimation;
        switch (animationData.fishAnimation) {
          case 'swimLeft':
            this.swimLeft();
            break;
          case 'swimRight':
            this.swimRight();
            break;

          default:
            this.swimLeft();
        }
      }
    );
  }

  private handleNewAnimation(animationData: FishAnimationData): boolean {
    // TODO In the future I want to move fish to their own collection so they have an ID. Then we can compare by ID rather tha name
    if (
      animationData.fishAnimation != this.currentAnimation &&
      this.fishName === animationData.fishName
    ) {
      this.stopCurrentAnimation();

      this.currentAnimation = animationData.fishAnimation;
      return true;
    }
    return false;
  }

  ngAfterViewInit(): void {
    this.canvas = this.goldfish?.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.image.src = this.spriteSheetURL;
    this.image.crossOrigin = 'true';
    this.canvasQuery = this.canvasQuery;
  }

  public swimLeft(): void {
    this.currentInterval = setInterval(() => {
      this.animate(this.swimmingLeftCycle);
    }, this.swimmingSpeed);
  }

  public swimRight(): void {
    this.currentInterval = setInterval(() => {
      this.animate(this.swimmingRightCycle);
    }, this.swimmingSpeed);
  }

  private stopCurrentAnimation() {
    clearInterval(this.currentInterval);
  }
}
