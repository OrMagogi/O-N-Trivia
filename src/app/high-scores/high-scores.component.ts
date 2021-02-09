import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TriviaService } from '../trivia.service';
import {MatDividerModule} from '@angular/material/divider';
import { element } from 'protractor';

export interface userScore {
  position: any;
  userName: string;
  maxScore: any;
}


var ELEMENT_DATA: userScore[] = [
  { position: "", userName: "", maxScore: "" },
  { position: "", userName: "", maxScore: "" },
  { position: "", userName: "", maxScore: "" },
  { position: "", userName: "", maxScore: "" },
  { position: "", userName: "", maxScore: "" }

];

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.css']
})
export class HighScoresComponent implements AfterViewInit {
  public myHighscore;
  public usersScores = [];
  constructor(private _triviaService: TriviaService) { }

  displayedColumns: string[] = ['position', 'userName', 'maxScore'];
  dataSource = new MatTableDataSource<userScore>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    let loggedUser=JSON.parse(localStorage["loggedUser"]);
    this.myHighscore=loggedUser.maxScore;
    
    this.dataSource.paginator = this.paginator;
    this._triviaService.getTopScores().subscribe((response: any[]) => {
      for (let index = 0; index < this.dataSource.data.length; index++) {
        this.dataSource.data[index].position = index + 1
        this.dataSource.data[index].userName = response[index].userName
        this.dataSource.data[index].maxScore = response[index].maxScore
      }
    })
  }


}

