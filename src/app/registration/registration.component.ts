import { EmployeeService } from './../shared/services/employee/employee.service';
import { Employee } from './../shared/model/employee.model';
import { Component, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent{
  public employee= new Employee;
  public event: EventEmitter<any> = new EventEmitter();
  public jobs=['Designer', 'Developer', 'Manager','Accountant'];

  constructor(
    public dialogRef: MatDialogRef<RegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _employee:EmployeeService,
    private _snackbar:MatSnackBar
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(employeeform){
    this._employee.storeEmployeeData(this.employee);  
    this.event.emit({data: this.employee});
    this.dialogRef.close();
    employeeform.reset();
  }

  openSnackBar(message, action) {
    this._snackbar.open(message,action, {
      duration: 2000,
    });
  }

}
