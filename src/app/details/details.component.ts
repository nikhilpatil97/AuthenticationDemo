import {
  EditComponent
} from './edit/edit.component';
import {
  EmployeeService
} from './../shared/services/employee/employee.service';
import {
  Employee
} from './../shared/model/employee.model';
import {
  RegistrationComponent
} from './../registration/registration.component';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public displayedColumns: string[] = ['fname', 'lname', 'phoneNo', 'email', 'city', 'job', 'delete', 'edit'];
  public data: Employee[];
  public columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(
    public dialog: MatDialog,
    private _employeeService: EmployeeService,
    private _snackbar: MatSnackBar,
    private route:ActivatedRoute,
  ) {}

  ngOnInit() {
    this.data = this._employeeService.getEmployeeData();
    // let emp=this.route.snapshot.paramMap.get('firstName');
  }

  deleteRecord(id: number): void {
      this._employeeService.deleteEmployeeRecord(id);
      this.data = this._employeeService.getEmployeeData();
      this._snackbar.open("Record Deleted", "Done", {
        duration: 2000,
      });
    } 
  
  openEdit(employee): void {
    let dialogRef = this.dialog.open(EditComponent, {
      width: '600px',
      data: employee,
    });
  }

  openRegistration(): void {
    let dialogRef = this.dialog.open(RegistrationComponent, {
      width: '600px',
      data: 'Registration Form'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.data = this._employeeService.getEmployeeData();
    });
  }
}