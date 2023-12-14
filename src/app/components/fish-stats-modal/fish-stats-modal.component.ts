import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { convertFirestoreTimestampToDate } from 'src/app/services/db-utils';
import { EmojiService } from 'src/app/services/emoji.service';
import { Fish } from 'src/app/types/fish';
import { RemoveFishModalComponent } from '../remove-fish-modal/remove-fish-modal.component';

@Component({
  selector: 'app-fish-stats-modal',
  templateUrl: './fish-stats-modal.component.html',
  styleUrls: ['./fish-stats-modal.component.scss'],
})
export class FishStatsModalComponent implements OnInit {
  @Input() fish!: Fish;
  @Output() fishFlushed: EventEmitter<Fish> = new EventEmitter();

  protected contentLoaded: boolean = true;
  protected showAlert: boolean = false;
  protected alertMessage: string = '';
  protected daysOld: number = 0;
  protected foodEmoji: string = '🍔';
  protected hungryEmoji: string = this.emojiService.generateRandomHungryEmoji();
  protected happyEmoji: string = this.emojiService.generateRandomHappyEmoji();

  constructor(
    protected activeModal: NgbActiveModal,
    private emojiService: EmojiService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.daysOld = this.calculateDaysOld();
  }

  protected feed(): void {
    // TODO make the feed button just feed the dang fish
    // const modalRef = this.modalService.open(FeedFishModalComponent);
    // modalRef.componentInstance.fish = this.fish;
    // modalRef.result.then((result) => {
    //   if (result === 'fed') {
    //     this.fishService.feedFish(this.fish);
    //     this.fishFed.emit(this.fish);
    //   }
    // });
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
