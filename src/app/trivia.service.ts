import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuestion } from './IQuestion';
import { INews } from './INews';


@Injectable({
  providedIn: 'any',
})
export class TriviaService {

  private _questionsUrl : string = "/assets/data/questions.json";
  private _newsUrl : string = "/assets/data/news.json";
  private _infoUrl : string = "/assets/data/information.json";

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<IQuestion[]>{
    return this.http.get<IQuestion[]>(this._questionsUrl);
  }

  getNews(): Observable<INews[]>{
    return this.http.get<INews[]>(this._newsUrl);
  }

  getInformation(): Observable<INews[]>{
    return this.http.get<INews[]>(this._infoUrl);
  }
}




