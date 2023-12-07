import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SpriteComponent } from '../../sprite/sprite.component';
import { SwimmingDirection, SwimmingSpeed } from 'src/app/types/fish';

@Component({
  selector: 'app-goldfish',
  templateUrl: './goldfish.component.html',
  styleUrls: ['./goldfish.component.scss'],
})
export class GoldfishComponent
  extends SpriteComponent
  implements AfterViewInit, OnInit
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
  private currentInterval: NodeJS.Timer | undefined;
  private currentAnimation: string = 'standStill';

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
    this.spritePositionToImagePosition(1, 0);
  private goldfishSwimmingRightTaleTuckedIn: any =
    this.spritePositionToImagePosition(1, 1);
  private goldfishSwimmingRightBlinkingTaleOut: any =
    this.spritePositionToImagePosition(1, 2);
  private goldfishSwimmingRightBlinkingTaleIn: any =
    this.spritePositionToImagePosition(1, 3);

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
  ];

  /*** SPEEDS ***/
  private swimmingSpeed: number = 200;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.justKeepSwimming();
    // this.blink();
  }

  ngAfterViewInit(): void {
    this.canvas = this.goldfish?.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.image.src = this.spriteSheetURL;
    this.image.crossOrigin = 'true';
    this.canvasQuery = this.canvasQuery;
  }

  public justKeepSwimming(): void {
    this.currentInterval = setInterval(() => {
      this.animate(this.swimmingLeftCycle);
    }, this.swimmingSpeed);
  }

  public blink(): void {
    this.currentInterval = setInterval(() => {
      // this.animate(this.blinkingCycle);
    }, this.swimmingSpeed);
  }
}
