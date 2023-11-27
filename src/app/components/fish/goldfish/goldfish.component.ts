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
  public override SPRITE_WIDTH = 256; // The total width in px divided by the number of columns
  public override SPRITE_HEIGHT = 256; // The total height in px divided by the total rows

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

  // TODO These properties should be in their own class
  protected swimmingDirection: SwimmingDirection = 'swim-right';
  protected currentXPosition: number = 0;
  protected currentYPosition: number = 0;
  protected swimmingVelocity: SwimmingSpeed = '5s';

  @Input() canvasQuery: any;
  @Input() fishName: string | undefined = undefined;

  @ViewChild('sprite', { static: true }) goldfish: ElementRef | undefined;

  /*** Images ***/
  private goldfishSwimming1: any = this.spritePositionToImagePosition(0, 0);
  private goldfishSwimming2: any = this.spritePositionToImagePosition(0, 1);
  private goldfishSwimming3: any = this.spritePositionToImagePosition(0, 2);
  private goldfishSwimming4: any = this.spritePositionToImagePosition(0, 3);

  private goldfishBlinking1: any = this.spritePositionToImagePosition(1, 0);
  private goldfishBlinking2: any = this.spritePositionToImagePosition(1, 1);
  private goldfishBlinking3: any = this.spritePositionToImagePosition(1, 2);
  private goldfishBlinking4: any = this.spritePositionToImagePosition(1, 3);

  /*** ANIMATIONS ***/

  private swimmingCycle: any = [
    this.goldfishSwimming1,
    this.goldfishSwimming2,
    this.goldfishSwimming3,
    this.goldfishSwimming4,
  ];

  private blinkingCycle: any = [
    this.goldfishBlinking1,
    this.goldfishBlinking2,
    this.goldfishBlinking3,
    this.goldfishBlinking4,
  ];

  /*** SPEEDS ***/
  private swimmingSpeed: number = 200;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.swimmingDirection = this.chooseRandomDirectionToSwimIn();
    this.swimmingVelocity = this.chooseRandomSpeed();
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
      this.animate(this.swimmingCycle);
    }, this.swimmingSpeed);
  }

  public blink(): void {
    this.currentInterval = setInterval(() => {
      this.animate(this.blinkingCycle);
    }, this.swimmingSpeed);
  }

  // TODO these methods should be in their own class

  private chooseRandomDirectionToSwimIn(): SwimmingDirection {
    const randomNumber = Math.floor(Math.random() * 2);
    return randomNumber === 0 ? 'swim-left' : 'swim-right';
  }

  private chooseRandomSpeed(): SwimmingSpeed {
    const randomNumber = Math.floor(Math.random() * 2);
    return randomNumber === 0 ? '5s' : '30s';
  }
}
