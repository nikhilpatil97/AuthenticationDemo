import { Employee } from './../model/employee.model';
import {
  Router
} from '@angular/router';
import {
  AuthenticationService
} from './../services/authentication/authentication.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import { EditComponent } from 'src/app/details/edit/edit.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private authenticate: AuthenticationService,
    private router: Router,
  ) {}
  public sidebar: string = "closed";
  public currentRecord:Employee;

  ngOnInit() {
  //   if (localStorage.getItem('currentUser')) {
  //     //this.logIn=true;
  //   }
  }
  logout():void{
    this.authenticate.logout();
    this.router.navigateByUrl('/login');
  }

  loginAuthenticate() {
    this.currentRecord = this.authenticate.authenticted();
    if (this.currentRecord) {
      return true;
    }
  }

  viewProfile(record):void{
    let dialogRef = this.dialog.open(EditComponent, {
      width: '600px',
      data: record,
    });
  }
}
