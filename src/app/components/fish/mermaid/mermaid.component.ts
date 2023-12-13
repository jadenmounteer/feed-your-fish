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
  public override SPRITE_WIDTH = 32; // The total width in px divided by the number of columns
  public override SPRITE_HEIGHT = 32; // The total height in px divided by the total rows

  // Spritesheets from Piskel seem to not have a border or spacing
  public override BORDER_WIDTH: number = 0;
  public override SPACING_WIDTH: number = 0;

  public override canvas: any;
  public override context: any;
  spriteSheetURL = 'assets/sprites/Mermaid.png';
  public override frameIndex: number = 0;
  public override frame: any;
  public override image = new Image();
  private fishAnimationSub$!: Subscription;

  @Input() canvasQuery: any;
  @Input() fish!: Fish;

  @ViewChild('sprite', { static: true }) mermaid: ElementRef | undefined;

  /*** Images ***/

  // Swimming left
  private swimmingLeftTaleOut: any = this.spritePositionToImagePosition(0, 0);
  private swimmingLeftTaleTuckedIn: any = this.spritePositionToImagePosition(
    0,
    1
  );
  private swimmingLeftBlinkingTaleOut: any = this.spritePositionToImagePosition(
    0,
    2
  );

  private swimmingLeftSinging1: any = this.spritePositionToImagePosition(0, 3);
  private swimmingLeftSinging2: any = this.spritePositionToImagePosition(1, 0);

  private swimmingLeftSinging3: any = this.spritePositionToImagePosition(1, 1);

  // Swimming Right
  private swimmingRightTaleOut: any = this.spritePositionToImagePosition(1, 2);
  private swimmingRightTaleTuckedIn: any = this.spritePositionToImagePosition(
    1,
    3
  );
  private swimmingRightBlinkingTaleOut: any =
    this.spritePositionToImagePosition(2, 0);

  private swimmingRightSinging1: any = this.spritePositionToImagePosition(2, 1);
  private swimmingRightSinging2: any = this.spritePositionToImagePosition(2, 2);

  private swimmingRightSinging3: any = this.spritePositionToImagePosition(2, 3);

  // Dead
  private dead1: any = this.spritePositionToImagePosition(3, 0);
  private dead2: any = this.spritePositionToImagePosition(3, 1);

  /*** ANIMATIONS ***/

  private swimmingLeftCycle: any = [
    this.swimmingLeftTaleOut,
    this.swimmingLeftTaleTuckedIn,
    this.swimmingLeftTaleOut,
    this.swimmingLeftTaleOut,
    this.swimmingLeftTaleTuckedIn,
    this.swimmingLeftBlinkingTaleOut,
    this.swimmingLeftTaleTuckedIn,
    this.swimmingLeftTaleOut,
    this.swimmingLeftTaleTuckedIn,
    this.swimmingLeftTaleOut,
    this.swimmingLeftTaleOut,
    this.swimmingLeftTaleTuckedIn,
    this.swimmingLeftBlinkingTaleOut,
    this.swimmingLeftTaleTuckedIn,
    this.swimmingLeftSinging1,
    this.swimmingLeftSinging2,
    this.swimmingLeftSinging3,
    this.swimmingLeftTaleTuckedIn,
  ];

  private swimmingRightCycle: any = [
    this.swimmingRightTaleOut,
    this.swimmingRightTaleTuckedIn,
    this.swimmingRightTaleOut,
    this.swimmingRightTaleOut,
    this.swimmingRightTaleTuckedIn,
    this.swimmingRightBlinkingTaleOut,
    this.swimmingRightTaleTuckedIn,
    this.swimmingRightTaleOut,
    this.swimmingRightTaleTuckedIn,
    this.swimmingRightTaleOut,
    this.swimmingRightTaleOut,
    this.swimmingRightTaleTuckedIn,
    this.swimmingRightBlinkingTaleOut,
    this.swimmingRightTaleTuckedIn,
    this.swimmingRightSinging1,
    this.swimmingRightSinging2,
    this.swimmingRightSinging3,
    this.swimmingRightTaleTuckedIn,
  ];

  private deadCycle: any = [
    this.dead1,
    this.dead1,
    this.dead1,
    this.dead2,
    this.dead2,
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
    this.canvas = this.mermaid?.nativeElement;
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
