import { Component } from '@angular/core';
import { TriviaService } from './trivia.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { User } from './user'
import { Routes, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';

//response coded
const NO_USER_FOUND = 1
const USER_ALREADY_REGISTERED = 2
const SIGNED_UP_SUCCESSFULY = 3

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app1';
  public userName = "Or";
  public counter = 0;
  public usernameColor;
  public isLoggedIn;
  public user;
  public modalTitle: string;
  public pageToDisplay = "homepage_template";
  //public questionsList =[];
  closeResult = '';
  constructor(private _triviaService: TriviaService, private modalService: NgbModal, private dialog: MatDialog) { }

  ngOnInit() {
    this.user = new User("", "", 0);
    console.log("is user logged?: " + localStorage["loggedUser"]);
    this.isLoggedIn = localStorage["loggedUser"] != "undefined"
    // if (this.isLoggedIn) {
    //   this.user = new User(localStorage["loggedUser"].userName, "", localStorage["loggedUser"].maxScore);
    // }
  }


  open(content, action: string) {
    this.modalTitle = action;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  onSubmit(operation: string) {
    this.user.highScore = 0;
    if (operation == 'Log in') {   // to be changed
      this.handleLogin()
    } else if (operation == 'Registration') {
      this.handleRegistration()
    }
  }

  handleLogin() {
    this._triviaService.getUserByUserNameAndPassword(this.user.userName, this.user.password).subscribe((data: any) => {
      if (data?.errorCode) {
        console.log("Problem occured");
      } else {
        if (data?.userName) {
          console.log("type of data: "+typeof data);
          console.log("data.userName: "+data.userName);
          
          localStorage["loggedUser"] = JSON.stringify(data)
          console.log("logged user: "+JSON.parse(localStorage["loggedUser"]).userName);
          
          this.user.userName = data.userName
          this.isLoggedIn = true
        } else {
          console.log("No user found");
        }
      }
      console.log(data)
    });
  }

  handleRegistration() {
    this._triviaService.signUpUser(this.user.userName, this.user.password).subscribe((data: any) => {
      if (data?.errorCode) {
        if (data.errorCode == USER_ALREADY_REGISTERED) {
          console.log("Username already taken, try another");
        } else {
          console.log('Problem signing up');
        }
      } else {
        console.log('Signed up succssefuly');
      }
      console.log(data)
    });
  }

  setPage(templateName) {
    this.pageToDisplay = templateName;

  }

  openLogoutDialog() {
    let dialogRef = this.dialog.open(LogoutDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == "logout") {
        console.log(result);
        localStorage["loggedUser"] = undefined
        this.isLoggedIn = false
      }
    })
  }

}

