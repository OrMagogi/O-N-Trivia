import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule , routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {TriviaService} from './trivia.service'
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import{ MatBadgeModule } from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
import {CountdownModule} from 'ngx-countdown';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { MDBBootstrapModule } from 'angular-bootstrap-md';






@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LogoutDialogComponent,
    HighScoresComponent
  ],
  entryComponents: [
    LogoutDialogComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatIconModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    CountdownModule,
    MatTableModule,
  ],

  providers: [TriviaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
