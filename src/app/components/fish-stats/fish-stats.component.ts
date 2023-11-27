import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedFishModalComponent } from 'src/app/feed-fish-modal/feed-fish-modal.component';
import { RemoveFishModalComponent } from 'src/app/remove-fish-modal/remove-fish-modal.component';
import { convertFirestoreTimestampToDate } from 'src/app/services/db-utils';
import { FishService } from 'src/app/services/fish.service';
import { TankService } from 'src/app/services/tank.service';
import { Fish } from 'src/app/types/fish';

@Component({
  selector: 'app-fish-stats',
  templateUrl: './fish-stats.component.html',
  styleUrls: ['./fish-stats.component.scss'],
})
export class FishStatsComponent implements OnInit {
  @Input() fish!: Fish;
  @Output() fishFed: EventEmitter<Fish> = new EventEmitter();
  @Output() fishFlushed: EventEmitter<Fish> = new EventEmitter();
  protected foodEmoji: string = '🍔';
  protected hungryEmoji: string = this.generateRandomHungryEmoji();
  protected happyEmoji: string = this.generateRandomHappyEmoji();
  protected daysOld: number = 0;

  constructor(
    private fishService: FishService,
    private modalService: NgbModal,
    private tankService: TankService
  ) {
    this.foodEmoji = this.generateRandomFoodEmoji();
  }

  ngOnInit(): void {
    this.daysOld = this.calculateDaysOld();
  }

  protected feed(): void {
    const modalRef = this.modalService.open(FeedFishModalComponent);
    modalRef.componentInstance.fish = this.fish;

    modalRef.result.then((result) => {
      if (result === 'fed') {
        this.fishService.feedFish(this.fish);
        this.fishFed.emit(this.fish);
      }
    });
  }

  protected removeFish(): void {
    const modalRef = this.modalService.open(RemoveFishModalComponent);
    modalRef.componentInstance.fish = this.fish;

    modalRef.result.then((result) => {
      if (result === 'flushed') {
        // Play the audio sound
        const audio = new Audio();
        audio.src = 'assets/sounds/toilet-flush.m4a';
        audio.load();
        audio.play();
        this.fishFlushed.emit(this.fish);
      }
    });
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

  private generateRandomHungryEmoji(): string {
    const hungryEmojis: string[] = [
      '🥺',
      '😒',
      '😞',
      '😟',
      '😠',
      '😡',
      '🤬',
      '😔',
      '😕',
      '🙁',
      '🤒',
    ];
    const randomIndex: number = Math.floor(Math.random() * hungryEmojis.length);
    return hungryEmojis[randomIndex];
  }

  private generateRandomHappyEmoji(): string {
    const happyEmojis: string[] = [
      '🥰',
      '😍',
      '😁',
      '😃',
      '😄',
      '😆',
      '😊',
      '😎',
      '🤪',
      '🤩',
      '🥳',
      '😏',
      '😌',
      '😛',
      '😇',
      '🤠',
    ];
    const randomIndex: number = Math.floor(Math.random() * happyEmojis.length);
    return happyEmojis[randomIndex];
  }

  private calculateDaysOld(): number {
    const today = new Date();
    const birthday = convertFirestoreTimestampToDate(this.fish.createdDate);
    const timeSinceBirthday = today.getTime() - birthday.getTime();
    let daysSinceBirthday = Math.round(timeSinceBirthday / (1000 * 3600 * 24));
    return daysSinceBirthday;
  }
}
