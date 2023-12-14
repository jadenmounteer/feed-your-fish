import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedFishModalComponent } from 'src/app/components/feed-fish-modal/feed-fish-modal.component';
import { RemoveFishModalComponent } from 'src/app/components/remove-fish-modal/remove-fish-modal.component';
import { convertFirestoreTimestampToDate } from 'src/app/services/db-utils';
import { EmojiService } from 'src/app/services/emoji.service';
import { FishService } from 'src/app/services/fish.service';
import { TankService } from 'src/app/services/tank.service';
import { Fish, FishDetails } from 'src/app/types/fish';

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
  protected hungryEmoji: string = this.emojiService.generateRandomHungryEmoji();
  protected happyEmoji: string = this.emojiService.generateRandomHappyEmoji();
  protected daysOld: number = 0;

  // TODO These were copy and pasted from add-fish-modal.component.ts. Find a way to make these DRY
  protected goldfishType: FishDetails = {
    name: 'Goldfish',
    imageURL: 'assets/goldfish-image.png',
    feedingInformation: 'Feed every 24 hours to keep your goldfish happy.',
    fishType: 'goldfish',
  };

  protected mermaidType: FishDetails = {
    name: 'Mermaid',
    imageURL: 'assets/mermaid-image.png',
    feedingInformation: 'Feed every 24 hours to keep your mermaid happy.',
    fishType: 'mermaid',
  };

  protected listOfFishes: FishDetails[] = [this.goldfishType, this.mermaidType];

  constructor(
    private fishService: FishService,
    private modalService: NgbModal,
    private tankService: TankService,
    private emojiService: EmojiService
  ) {
    this.foodEmoji = this.emojiService.generateRandomFoodEmoji();
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

  private calculateDaysOld(): number {
    const today = new Date();
    const birthday = convertFirestoreTimestampToDate(this.fish.createdDate);
    const timeSinceBirthday = today.getTime() - birthday.getTime();
    let daysSinceBirthday = Math.round(timeSinceBirthday / (1000 * 3600 * 24));
    return daysSinceBirthday;
  }
}
