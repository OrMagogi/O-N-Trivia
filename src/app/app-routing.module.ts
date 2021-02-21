import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TriviaComponent } from './trivia/trivia.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
const routes: Routes = [
  {path: '', component:HomepageComponent},
  {path: 'triviaSp' , component: TriviaComponent},
  {path: 'homePage' , component: HomepageComponent},
  {path: 'highScores' , component: HighScoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [TriviaComponent , HomepageComponent]
