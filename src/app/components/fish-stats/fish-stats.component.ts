import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FishService } from 'src/app/services/fish.service';
import { Fish } from 'src/app/types/fish';

@Component({
  selector: 'app-fish-stats',
  templateUrl: './fish-stats.component.html',
  styleUrls: ['./fish-stats.component.scss'],
})
export class FishStatsComponent {
  @Input() fish!: Fish;
  @Output() fishFed: EventEmitter<Fish> = new EventEmitter();
  protected foodEmoji: string = '🍔';

  constructor(private fishService: FishService) {
    this.foodEmoji = this.generateRandomFoodEmoji();
  }

  protected feed(): void {
    // TODO show the modal and things

    // Update the data
    this.fishService.feedFish(this.fish);
    console.log(this.fish);
    this.fishFed.emit(this.fish);
  }

  private generateRandomFoodEmoji(): string {
    const foodEmojis: string[] = [
      '🍔',
      '🍕',
      '🍟',
      '🍗',
      '🥩',
      '🥓',
      '🍖',
      '🌭',
      '🍿',
      '🍱',
      '🍛',
      '🍜',
      '🍝',
      '🍣',
      '🍤',
      '🍙',
      '🍚',
      '🍘',
      '🥮',
      '🥟',
      '🍢',
      '🍡',
      '🍧',
      '🍨',
      '🍦',
      '🥧',
      '🧁',
      '🍰',
      '🎂',
      '🍮',
      '🍭',
      '🍬',
      '🍫',
      '🍩',
      '🥥',
      '🥝',
      '🍇',
      '🍉',
      '🍊',
      '🍋',
      '🍌',
      '🍍',
      '🍎',
      '🍏',
      '🍐',
      '🍑',
      '🍒',
      '🍓',
      '🥭',
      '🍅',
      '🥑',
      '🥦',
      '🥬',
      '🥒',
      '🌶',
      '🌽',
      '🥕',
      '🥔',
      '🍠',
      '🥐',
      '🥯',
      '🍞',
      '🥖',
      '🍳',
      '🥗',
    ];
    const randomIndex: number = Math.floor(Math.random() * foodEmojis.length);
    return foodEmojis[randomIndex];
  }
}
