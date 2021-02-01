import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../IQuestion';
import { TriviaService } from '../trivia.service';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent {

  public questionsList: any = [];
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
  public triviaInfo=[];  // holds the question number and the answer given
  public triviaTimer;


  constructor(private _triviaService: TriviaService) {
    this.stage1 = true;
    this.stage2 = false;
    this.stage3 = false;
    this.numberOfQuestions = 5;
    this.questionIndex = 0;
    this.userScore = 0;
    this.correctsCombo=0;
    this.correctAnswers=0;
    this.isAnimated=true;
  }

  ngOnInit() {
    // response is the data that came back from the get request
    this._triviaService.getQuestions().subscribe(response => this.questionsList = response);
    this.answersIndexes = [0, 1, 2, 3];
  }

  startTriviaSp() {
    this.setStage(false, true, false);
    this.triviaTimer=60;
    this.changeAnswersOrder();
  }

  checkAnswer(clickedAnswer) {
    this.isAnimated=false;
    this.isAnimated=true;
    if(clickedAnswer == this.questionsList[this.questionIndex].answers[0]){
      this.calculateScore();
      this.correctsCombo+=1;
      this.correctAnswers+=1;
    } else{
      this.correctsCombo=0;
    }
    this.triviaInfo[this.questionIndex] = {"index": this.questionIndex , "givenAnswer" : clickedAnswer};
    this.stepToNextQuestion();
  }

  stepToNextQuestion(){
    this.questionIndex +=1;
    if (this.questionIndex == this.numberOfQuestions) {
      this.setStage(false, false, true);
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
      let random1 = Math.floor(Math.random()*4);
      let random2 = Math.floor(Math.random()*4);
      let temp = this.answersIndexes[random1];
      this.answersIndexes[random1] = this.answersIndexes[random2];
      this.answersIndexes[random2] = temp;
    }
  }

  calculateScore(){
    this.userScore+= (100+ 100*(this.correctsCombo *1.2) + 200*Math.floor((this.correctsCombo+1)/5));
  }


  public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  lowerTimer(){
    
  }
}
