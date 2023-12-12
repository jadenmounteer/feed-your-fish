import { Component } from '@angular/core';
import { Fish, FishAnimationData } from 'src/app/types/fish';

@Component({
  template: '',
})
export class SpriteComponent {
  public BORDER_WIDTH: number = 1;
  public SPACING_WIDTH: number = 1;
  public SPRITE_WIDTH = 96; // The total width in px divided by the number of columns
  public SPRITE_HEIGHT = 96; // The total height in px divided by the total rows
  private currentAnimation: string = 'standStill';
  public currentInterval: any;

  frameIndex = 0;
  frame: any;
  image = new Image();
  canvas: any;
  public context: any;

  public spritePositionToImagePosition(row: number, col: number) {
    return {
      x: this.BORDER_WIDTH + col * (this.SPACING_WIDTH + this.SPRITE_WIDTH),
      y: this.BORDER_WIDTH + row * (this.SPACING_WIDTH + this.SPRITE_HEIGHT),
    };
  }

  public animate(animationFrames: any) {
    // once we hit the end of the cycle, start again
    if (this.frameIndex === animationFrames.length) {
      this.frameIndex = 0;
    }
    this.frame = animationFrames[this.frameIndex];
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(
      this.image,
      this.frame.x,
      this.frame.y,
      this.SPRITE_WIDTH,
      this.SPRITE_HEIGHT,
      0,
      0,
      this.SPRITE_WIDTH,
      this.SPRITE_HEIGHT
    );
    this.frameIndex += 1;
  }

  public getXCoordinate() {
    return this.canvas.getBoundingClientRect().x;
  }

  public getYCoordinate() {
    return this.canvas.getYCoordinate().y;
  }

  public processAnimation(animationData: FishAnimationData, fish: Fish) {
    if (!this.handleNewAnimation(animationData, fish)) {
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

  private handleNewAnimation(
    animationData: FishAnimationData,
    fish: Fish
  ): boolean {
    // TODO In the future I want to move fish to their own collection so they have an ID. Then we can compare by ID rather tha name
    if (
      animationData.fishAnimation != this.currentAnimation &&
      fish.fishName === animationData.fishName
    ) {
      this.stopCurrentAnimation();

      this.currentAnimation = animationData.fishAnimation;
      return true;
    }
    return false;
  }

  private stopCurrentAnimation() {
    clearInterval(this.currentInterval);
  }

  public swimRight(): void {}
  public swimLeft(): void {}
}
