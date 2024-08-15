import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { environment } from '../environment/environment';
import {IPassportOffice} from '../interfaces/IPassportOffice';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  myURL = environment.apiUrl;

  constructor(private http:HttpClient) {   }






  getPassportOffices(): Observable<IPassportOffice[]> {
    return this.http.get<IPassportOffice[]>(`${this.myURL}/passportOffices`,);
  }








}



