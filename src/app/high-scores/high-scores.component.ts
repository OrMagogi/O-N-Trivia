import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TriviaService } from '../trivia.service';

export interface userScore {
  position: any;
  userName: string;
  maxScore: any;
}


var ELEMENT_DATA: userScore[] = [
  { position: "", userName: "", maxScore: "" }

];

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.css']
})
export class HighScoresComponent implements AfterViewInit {


  public usersScores = [];
  constructor(private _triviaService: TriviaService) { }

  displayedColumns: string[] = ['position', 'userName', 'maxScore'];
  dataSource = new MatTableDataSource<userScore>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this._triviaService.getTopScores().subscribe((response: any[]) => {
      // ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<userScore>(response)

    })



  }


}

