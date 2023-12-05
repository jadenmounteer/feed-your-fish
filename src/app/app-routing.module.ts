import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FishTankComponent } from './components/fish-tank/fish-tank.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FishTankComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'fish-tank',
    component: FishTankComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'landing-page',
    component: LandingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
