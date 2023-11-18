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
  @Input() userId: string | undefined;

  protected loading: boolean = true;
  protected tanks: Tank[] = [];
  private tankSubscription$ = new Subscription();

  constructor(
    private modalService: NgbModal,
    private tankService: TankService
  ) {}

  ngOnInit(): void {
    this.loadTanks();
  }

  private loadTanks(): void {
    this.tankSubscription$ = this.tankService
      .fetchTanks()
      .subscribe((tanks: Tank[]) => {
        this.tanks = tanks;
        console.log(this.tanks);

        this.loading = false;
      });
  }
  protected onCreateTank(): void {
    const modalRef = this.modalService.open(CreateTankModalComponent);
    modalRef.result.then((result) => {
      if (result !== undefined) {
        this.tanks.push(result);
      }
    });
  }

  ngOnDestroy(): void {
    this.tankSubscription$.unsubscribe();
  }
}