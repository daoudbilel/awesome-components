import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ComplexFormValue} from "../models/complex-form-value.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, delay, mapTo} from "rxjs/operators";
import {of} from "rxjs";


@Injectable()
export class ComplexFormService {

  constructor(private http: HttpClient) {
  }

  saveUserInfo(formValue: ComplexFormValue): Observable<boolean> {
    return this.http.post(`${environment.apiUrl}/users`, formValue).pipe(
      mapTo(true),
      delay(1000),
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    );
  }


}

