import { Component } from '@angular/core';
import { TriviaService } from './trivia.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { User } from './user'
import {Routes,RouterModule } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app1';
  public userName= "Or";
  public counter=0;
  public usernameColor;
  public isLoggedIn;
  public user;
  public modalTitle:string;
  public pageToDisplay="homepage_template";
  //public questionsList =[];
  closeResult = '';

  constructor(private _triviaService : TriviaService, private modalService: NgbModal,private dialog: MatDialog){}

  ngOnInit(){
    this.user = new User("","",0);
    this.isLoggedIn=false;
  }


  open(content,action:string) {
    this.modalTitle = action;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(operation:string){
    this.user.highScore =0;
    //alert(operation+": "+this.user.userName +" "+ this.user.password +" "+ this.user.highScore);
    if(operation=='Log in'){   // to be changed
      // this.isLoggedIn=true;
      
    }
  }

  setPage(templateName){
    this.pageToDisplay = templateName;

  }

  openLogoutDialog(){
    let dialogRef= this.dialog.open(LogoutDialogComponent);
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.isLoggedIn=false;
      }
    })
  }

  
}
