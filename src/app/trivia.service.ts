import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuestion } from './IQuestion';
import { INews } from './INews';


@Injectable({
  providedIn: 'any',
})
export class TriviaService {

  //server's address and port URL
  private serverURL: string = "http://localhost:5000";

  private _questionsUrl : string = "/assets/data/questions.json";
  private _remoteQuestionsUrl: string = `${this.serverURL}/getQuestions`;
  private _getUserUrl: string = `${this.serverURL}/getUserByUserNameAndPassword`;
  private _signUpUserUrl: string = `${this.serverURL}/signUpUser`;
  private _newsUrl: string = "/assets/data/news.json";
  private _infoUrl: string = "/assets/data/information.json";

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<string> {
    return this.http.get<string>(this._remoteQuestionsUrl);
  }



  getUserByUserNameAndPassword(_userName: string, _password: string): Observable<string> {
    let user = { userName: _userName, password: _password }    
    return this.http.post<string>(this._getUserUrl, user);
  }

  signUpUser(_userName: string, _password: string): Observable<string> {
    let user = { userName: _userName, password: _password }    
    return this.http.post<string>(this._signUpUserUrl, user);
  }

  getNews(): Observable<INews[]> {
    return this.http.get<INews[]>(this._newsUrl);
  }

  getInformation(): Observable<INews[]> {
    return this.http.get<INews[]>(this._infoUrl);
  }
}




