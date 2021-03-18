import {
  EmployeeService
} from './../employee/employee.service';
import {
  Employee
} from 'src/app/shared/model/employee.model';
import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import {
  map
} from 'rxjs/operators';

//Array in local storage for register employee
let employees = JSON.parse(localStorage.getItem('employee'))

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject < Employee > ;
  public currentUser: Observable < Employee > ;

  constructor(private http: HttpClient,
    private _employeeService: EmployeeService) {
    this.currentUserSubject = new BehaviorSubject < Employee > (JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Employee {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    let loginInfo: any = this._employeeService.authenticate(email, password);
    if (loginInfo.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(loginInfo));
      this.currentUserSubject.next(loginInfo);
    }
    return loginInfo;

    // return this.http.post<any>(`/users/authenticate`, { username, password })
    //     .pipe(map(user => {
    //         // login successful if there's a jwt token in the response
    //         if (user && user.token) {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('currentUser', JSON.stringify(user));
    //             this.currentUserSubject.next(user);
    //         }

    //         return user;
    //     }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  authenticted() {
    //return this.currentUserSubject.value.token;
    let currentRecord=JSON.parse(localStorage.getItem('currentUser'));
    return currentRecord;
    
  }
}