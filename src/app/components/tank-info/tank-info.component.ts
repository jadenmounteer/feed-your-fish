import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tank } from 'src/app/types/tank';
import { CreateTankModalComponent } from '../create-tank-modal/create-tank-modal.component';
import { Subscription } from 'rxjs';
import { TankService } from 'src/app/services/tank.service';

@Component({
  selector: 'app-tank-info',
  templateUrl: './tank-info.component.html',
  styleUrls: ['./tank-info.component.scss'],
})
export class TankInfoComponent implements OnInit, OnDestroy {
  @Input() userEmail: string | null | undefined;
  @Input() userId!: string | undefined;
  @Input() idOfFishTankViewing!: string;

  protected loading: boolean = true;
  protected tanks: Tank[] = [];
  private tankSubscription$ = new Subscription();
  private userDataSubscription$ = new Subscription();
  protected tankUserIsViewing: Tank | undefined;

  constructor(
    private modalService: NgbModal,
    private tankService: TankService
  ) {}

  ngOnInit(): void {
    if (!this.userId) {
      throw new Error('userId is undefined');
    }
    this.loadTanks();
  }

  private loadTanks(): void {
    if (!this.userId) {
      return;
    }
    this.tankSubscription$ = this.tankService
      .fetchTanksByUser(this.userId)
      .subscribe((tanks: Tank[]) => {
        this.tanks = tanks;

        if (!this.userId) {
          return;
        }
      });
  }

  protected onCreateTank(): void {
    const modalRef = this.modalService.open(CreateTankModalComponent);
    modalRef.result.then((result) => {
      if (result !== undefined) {
        this.tanks.push(result);
        this.setUserCurrentlyViewingTank(result);
      }
    });
  }

  protected setUserCurrentlyViewingTank(tank: Tank): void {
    if (!this.userId) {
      return;
    }
    this.tankService.updateTankUserIsCurrentlyViewing(tank.id);
    this.tankUserIsViewing = tank;
  }

  ngOnDestroy(): void {
    this.tankSubscription$.unsubscribe();
    this.userDataSubscription$.unsubscribe();
  }
}
