import {
  Employee
} from './../../model/employee.model';
import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';

//Local storage Employee Records
let employees = JSON.parse(localStorage.getItem('employees')) || [];


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public employeeData: Employee;
  public employeDetails: Employee[] = [];
  public key = "employees";

  constructor(private _http: HttpClient) {}

  //Function for Storing employee details in local storage

  public storeEmployeeData(employeeData) {
    this.employeDetails = JSON.parse(localStorage.getItem(this.key));
    employeeData.id = this.employeDetails.length;
    this.employeDetails.push(employeeData);
    localStorage.removeItem("employees");
    localStorage.setItem(this.key, JSON.stringify(this.employeDetails));

  }


  //Function for fetching employee details from json
  // public getEmployeeData(): Observable<EmployeeResponse>{
  //   return this._http.get<EmployeeResponse>('/assets/employee.json');    
  // }

  //Function for fetching employee details from local storage
  public getEmployeeData() {
    this.employeDetails = [];
    this.employeeData = JSON.parse(localStorage.getItem(this.key));
    this.employeDetails.push(this.employeeData);
    return this.employeDetails;
  }

  //Function for update employee Details in local storage
  public updateEmployeeData(employeeData) {
    //localStorage.setItem(this.key, JSON.stringify(employeeData));
    console.log("success");
    let employeeDetails = JSON.parse(localStorage.getItem(this.key));
    for (let i = 0; i < employeeDetails.length; i++) {
      if (employeeData.id == employeeDetails[i].id) {
        employeeDetails.splice(i, 1, employeeData);
        localStorage.removeItem("employees");
        localStorage.setItem(this.key, JSON.stringify(employeeDetails));
        console.log(employeeDetails);
      }
    }
  }

  //Function for deleting employee details from local storage
  public deleteEmployeeRecord(id) {
    let employeeDetails = JSON.parse(localStorage.getItem(this.key));
    for (let i = 0; i < employeeDetails.length; i++) {
      if (id == employeeDetails[i].id) {
        employeeDetails.splice(i, 1);
        localStorage.removeItem("employees");
        localStorage.setItem(this.key, JSON.stringify(employeeDetails));
        console.log(employeeDetails);
      }
    }
  }

  //Function for Login verification
  public authenticate(email, password) {

    let emp = employees.find(x => x.email == email && x.password == password)
       
    if (!emp) return 'Username or password is incorrect';
    return ({
      id: emp.id,
      email: emp.email,
      fname: emp.fname,
      lname: emp.lname,
      phoneNo:emp.phoneNo,
      city: emp.city,
      job:emp.job,
      token: true
    })
  }
}
