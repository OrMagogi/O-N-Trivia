import { Component, OnInit } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { TriviaService } from '../trivia.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  //images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  private image1 : string = "/assets/data/carousel_1.jpg";
  private image2 : string = "/assets/data/carousel_2.jpg";
  private image3 : string = "/assets/data/carousel_3.jpg";
  private image4 : string = "/assets/data/carousel_4.jpg";

  images =[this.image1 , this.image2 , this.image3 , this.image4];
  public newsList =[];
  public informationList=[];
  public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  constructor(private _triviaService : TriviaService){}

  ngOnInit(){
    // response is the data that came back from the get request
    this._triviaService.getNews().subscribe(response=> this.newsList = response); 
    this._triviaService.getInformation().subscribe(response=> this.informationList = response); 
  }

  

}
