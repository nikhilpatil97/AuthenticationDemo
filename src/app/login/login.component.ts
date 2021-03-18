import { AuthenticationService } from './../shared/services/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from './../shared/services/employee/employee.service';
import {
  Employee
} from 'src/app/shared/model/employee.model';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public employee: Employee = new Employee;
  public loginInvalid: boolean = false;
  public returnUrl:string;
  public hide: boolean=true;

  constructor(
    private dialog: MatDialog,
    private _employeeService:EmployeeService,
    private authenticate:AuthenticationService,
    private route:ActivatedRoute,
    private router:Router) {
      if (this.authenticate.currentUserValue) { 
        this.router.navigate(['/']);
    }
    }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(employeeForm) {
      let employee=this.authenticate.login(this.employee.email, this.employee.password)
      if(employee=='Username or password is incorrect'){
        this.loginInvalid=true;
      } 
      //else this.router.navigate(['/details',{firstName:employee.fname, lastName:employee.lname}]);
      else this.router.navigate(['/details']);
}

  openRegistration(): void {
    let dialogRef = this.dialog.open(RegistrationComponent, {
      width: '600px',
      data: 'Registration Form'
    });
    
}

}