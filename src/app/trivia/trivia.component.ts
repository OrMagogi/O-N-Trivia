import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../IQuestion';
import { TriviaService } from '../trivia.service';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { CountdownModule } from 'ngx-countdown';
import { timer } from 'rxjs';
import { updateConstructorTypeNode } from 'typescript';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent {

  public questionsList: any[] = [];
  public stage1: boolean;
  public stage2: boolean;
  public stage3: boolean;
  public questionIndex;
  public numberOfQuestions;
  public userScore;
  public userHighestScore;
  public answersIndexes = [];
  public correctsCombo;
  public correctAnswers;
  public isAnimated;
  public triviaInfo = [];  // holds the question number and the answer given
  public triviaTimer: number;
  public leftTime;
  public answersDivClasses = [];


  constructor(private _triviaService: TriviaService) {
    this.stage1 = true;
    this.stage2 = false;
    this.stage3 = false;
    this.numberOfQuestions = 5;
    this.questionIndex = 0;
    this.userScore = 0;
    this.correctsCombo = 0;
    this.correctAnswers = 0;
    this.isAnimated = true;
    this.triviaTimer = 60;

  }

  ngOnInit() {
    // response is the data that came back from the get request
    this._triviaService.getRemoteQuestions().subscribe((response: any[]) => {

      response.forEach(element => {
        this.questionsList.push(JSON.parse(element));
      });
    });

    this.answersIndexes = [0, 1, 2, 3];
    this.answersDivClasses[0] = "triviaOption";
    this.answersDivClasses[1] = "triviaOption";
    this.answersDivClasses[2] = "triviaOption";
    this.answersDivClasses[3] = "triviaOption";

  }

  startTriviaSp() {
    this.setStage(false, true, false);
    console.log("Trivia_Component_ts - startTriviaSp() " + this.triviaTimer);
    console.log(`this ${this}`);
    this.changeAnswersOrder();
  }

  async checkAnswer(clickedAnswer, divNumber) {
    this.answersDivClasses[0] += " disabledAnswer";
    this.answersDivClasses[1] += " disabledAnswer";
    this.answersDivClasses[2] += " disabledAnswer";
    this.answersDivClasses[3] += " disabledAnswer";
    this.answersDivClasses[this.answersIndexes.lastIndexOf(0)] += " correctAnswer";
    if (clickedAnswer == this.questionsList[this.questionIndex].answers[0]) {
      this.calculateScore();
      this.correctsCombo += 1;
      this.correctAnswers += 1;
    } else {
      this.answersDivClasses[divNumber] += " wrongAnswer";
      this.correctsCombo = 0;
    }
    await this.delay(1500);
    this.triviaInfo[this.questionIndex] = { "index": this.questionIndex, "givenAnswer": clickedAnswer };
    this.answersDivClasses[0] = "triviaOption";
    this.answersDivClasses[1] = "triviaOption";
    this.answersDivClasses[2] = "triviaOption";
    this.answersDivClasses[3] = "triviaOption";
    this.stepToNextQuestion();
  }

  stepToNextQuestion() {
    this.questionIndex += 1;
    if (this.questionIndex == this.numberOfQuestions) {
      this.setStage(false, false, true);
      let loggedUser = JSON.parse(localStorage["loggedUser"])
      console.log("score from local storage: " + loggedUser?.maxScore);
      if (this.userScore > loggedUser.maxScore) {
        loggedUser.maxScore = this.userScore
        this.updateScoreAfterGame(loggedUser);
      } else {
        console.log("highscore wasnt reached. No update");

      }
    } else {
      this.changeAnswersOrder();
    }

  }

  setStage(if1: boolean, if2: boolean, if3: boolean) {
    this.stage1 = if1;
    this.stage2 = if2;
    this.stage3 = if3;
  }

  changeAnswersOrder() {
    for (let i = 10; i > 0; i--) {
      let random1 = Math.floor(Math.random() * 4);
      let random2 = Math.floor(Math.random() * 4);
      let temp = this.answersIndexes[random1];
      this.answersIndexes[random1] = this.answersIndexes[random2];
      this.answersIndexes[random2] = temp;
    }
  }

  calculateScore() {
    this.userScore += (100 + 100 * (this.correctsCombo * 1.2) + 200 * Math.floor((this.correctsCombo + 1) / 5));
  }


  public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  handleTimerEvent(event) {
    if (event == "done") {
      for (let i = this.questionIndex; i < this.numberOfQuestions; i++) {
        this.triviaInfo[this.questionIndex] = { "index": this.questionIndex, "givenAnswer": "---" };
        this.questionIndex += 1;
      }
      this.setStage(false, false, true);
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  updateScoreAfterGame(loggedUser: { userName: string; maxScore: number; }) {
    // this._triviaService.updateUserScore("naor5",333).subscribe(response=>{
    // });
    localStorage["loggedUser"] = JSON.stringify(loggedUser)
    this._triviaService.updateUserScore(loggedUser.userName, loggedUser.maxScore).subscribe(response => {
      console.log(response);
      
    });
  }

}
