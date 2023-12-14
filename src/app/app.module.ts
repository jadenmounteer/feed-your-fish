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
import { AngularFireModule } from '@angular/fire/compat';
import { LoginOrSignUpComponent } from './components/login-or-sign-up/login-or-sign-up.component';
import { AuthService } from './services/auth.service';
import { TankInfoComponent } from './components/tank-info/tank-info.component';
import { CreateTankModalComponent } from './components/create-tank-modal/create-tank-modal.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FishTankComponent } from './components/fish-tank/fish-tank.component';
import { AuthGuard } from './services/auth.guard';
import { AddFishModalComponent } from './components/add-fish-modal/add-fish-modal.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedFishModalComponent } from './components/feed-fish-modal/feed-fish-modal.component';
import { RemoveFishModalComponent } from './components/remove-fish-modal/remove-fish-modal.component';
import { FishTankHeaderComponent } from './components/fish-tank-header/fish-tank-header.component';
import { MermaidComponent } from './components/fish/mermaid/mermaid.component';
import { FishStatsModalComponent } from './components/fish-stats-modal/fish-stats-modal.component';

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
    FishTankComponent,
    AddFishModalComponent,
    LoadingSpinnerComponent,
    FeedFishModalComponent,
    RemoveFishModalComponent,
    FishTankHeaderComponent,
    MermaidComponent,
    FishStatsModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
