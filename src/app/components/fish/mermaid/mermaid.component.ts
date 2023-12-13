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
import { Fish, FishAnimationData } from 'src/app/types/fish';
import { FishService } from 'src/app/services/fish.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mermaid',
  templateUrl: './mermaid.component.html',
  styleUrls: ['./mermaid.component.scss'],
})
export class MermaidComponent
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
  private fishAnimationSub$!: Subscription;

  @Input() canvasQuery: any;
  @Input() fish!: Fish;

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
    this.spritePositionToImagePosition(1, 0);
  private goldfishSwimmingLeftBubbles2: any =
    this.spritePositionToImagePosition(1, 1);
  private goldfishSwimmingLeftBubbles3: any =
    this.spritePositionToImagePosition(1, 2);

  // Swimming Right
  private goldfishSwimmingRightTaleOut: any =
    this.spritePositionToImagePosition(1, 3);
  private goldfishSwimmingRightTaleTuckedIn: any =
    this.spritePositionToImagePosition(2, 0);
  private goldfishSwimmingRightBlinkingTaleOut: any =
    this.spritePositionToImagePosition(2, 1);
  private goldfishSwimmingRightBlinkingTaleIn: any =
    this.spritePositionToImagePosition(2, 2);
  private goldfishSwimmingRightBubbles1: any =
    this.spritePositionToImagePosition(2, 3);
  private goldfishSwimmingRightBubbles2: any =
    this.spritePositionToImagePosition(3, 0);
  private goldfishSwimmingRightBubbles3: any =
    this.spritePositionToImagePosition(3, 1);

  // Dead
  private goldfishDead1: any = this.spritePositionToImagePosition(3, 2);
  private goldfishDead2: any = this.spritePositionToImagePosition(3, 3);

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

  private deadCycle: any = [
    this.goldfishDead1,
    this.goldfishDead1,
    this.goldfishDead1,
    this.goldfishDead2,
    this.goldfishDead2,
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
    if (this.fish.fishStatus === 'Dead') {
      // TODO add dead animation
      this.beDead();
    } else {
      this.swimLeft();
    }

    this.fishAnimationSub$ = this.fishService.animationChangeEmitter.subscribe(
      (animationData: FishAnimationData) => {
        this.processAnimation(animationData, this.fish);
      }
    );
  }

  ngAfterViewInit(): void {
    this.canvas = this.goldfish?.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.image.src = this.spriteSheetURL;
    this.image.crossOrigin = 'true';
    this.canvasQuery = this.canvasQuery;
  }

  public override swimLeft(): void {
    this.currentInterval = setInterval(() => {
      this.animate(this.swimmingLeftCycle);
    }, this.swimmingSpeed);
  }

  public override swimRight(): void {
    this.currentInterval = setInterval(() => {
      this.animate(this.swimmingRightCycle);
    }, this.swimmingSpeed);
  }

  public beDead(): void {
    this.currentInterval = setInterval(() => {
      this.animate(this.deadCycle);
    }, 500);
  }
}
