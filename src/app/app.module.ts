import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment.prod';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { GoldfishComponent } from './components/fish/goldfish/goldfish.component';

@NgModule({
  declarations: [AppComponent, GoldfishComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
