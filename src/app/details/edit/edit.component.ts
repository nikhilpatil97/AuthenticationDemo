import { EmployeeService } from './../../shared/services/employee/employee.service';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/shared/model/employee.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public employee:Employee;
  public event: EventEmitter<any> = new EventEmitter();
  public jobs=['Designer', 'Developer', 'Manager','Accountant'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private _snackbar:MatSnackBar,
    public dialogRef: MatDialogRef<EditComponent>,
    private _employee:EmployeeService
    
  ) { }

  ngOnInit(): void {
    this.employee=this.data;
  }

  onSubmit():void{
    this._employee.updateEmployeeData(this.employee); 
    this.event.emit({data: this.employee});
    this.dialogRef.close();
    
  }

  openSnackBar(message, action) {
    this._snackbar.open(message,action, {
      duration: 2000,
    });
  }

  onCancel():void{
    this.dialogRef.close();

  }

}
