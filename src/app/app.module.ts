import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { GoldfishComponent } from './components/fish/goldfish/goldfish.component';
import { NavComponent } from './components/nav/nav.component';
import { GoogleButtonComponent } from './components/google-button/google-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { LoginOrSignUpComponent } from './components/login-or-sign-up/login-or-sign-up.component';
import { AuthService } from './services/auth.service';
import { TankInfoComponent } from './components/tank-info/tank-info.component';
import { CreateTankModalComponent } from './components/create-tank-modal/create-tank-modal.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AuthGuard } from './services/auth.guard';
import { FishTankComponent } from './components/fish-tank/fish-tank.component';
import { FishStatsSectionComponent } from './components/fish-stats-section/fish-stats-section.component';
import { AddFishModalComponent } from './components/add-fish-modal/add-fish-modal.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FishStatsComponent } from './components/fish-stats/fish-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    GoldfishComponent,
    NavComponent,
    GoogleButtonComponent,

    LoginOrSignUpComponent,
    TankInfoComponent,
    CreateTankModalComponent,
    LandingPageComponent,
    HomePageComponent,
    FishTankComponent,
    FishStatsSectionComponent,
    AddFishModalComponent,
    LoadingSpinnerComponent,
    FishStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
