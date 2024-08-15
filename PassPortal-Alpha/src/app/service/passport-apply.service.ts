import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INewPassportForm } from '../interfaces/INewPassportForm';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { IReNewForm } from '../interfaces/IReNewForm';
import { environment } from '../environment/environment';
import { Payment } from '../constants/Payment';

@Injectable({
  providedIn: 'root'
})
export class PassportApplyService {

  myURL = environment.apiUrl;

  constructor(private http:HttpClient) { }

  SaveNewPassportForm = (data:INewPassportForm):Observable<INewPassportForm> =>{
    return this.http.post<INewPassportForm>(this.myURL+"/NewPassportApply",data);
  }
  GetAllNewPassportData = ():Observable<INewPassportForm[]> =>{
    return this.http.get<INewPassportForm[]>(this.myURL+"/NewPassportApply");
  }
  SaveReNewPassportForm = (data:IReNewForm):Observable<IReNewForm> =>{
    return this.http.post<IReNewForm>(this.myURL+"/Re-NewPassport",data);
  }

  GetAllReNewPassportData = ():Observable<IReNewForm[]> =>{
    return this.http.get<IReNewForm[]>(this.myURL+"/Re-NewPassport");
  }
  GetAllPassportData = (): Observable<(INewPassportForm | IReNewForm)[]> => {
    const newPassport$ = this.http.get<INewPassportForm[]>(`${this.myURL}/NewPassportApply`);
    const renewPassport$ = this.http.get<IReNewForm[]>(`${this.myURL}/Re-NewPassport`);

    return forkJoin([newPassport$, renewPassport$]).pipe(
      map(([newPassportData, renewPassportData]) => {
        return [...newPassportData, ...renewPassportData];
      }),
      catchError(error => {
        console.error('Error fetching data', error);
        return of([] as (INewPassportForm | IReNewForm)[]);
      })
    );
  };
  getNewPassportById(id: string): Observable<INewPassportForm | undefined> {
    return this.GetAllNewPassportData().pipe(
      map(passports => passports.find(passport => passport.passportNumber === id))
    );
  }

  editNewPassportData = (id:string,data:INewPassportForm):Observable<INewPassportForm> =>{
    return this.http.put<INewPassportForm>(`${this.myURL}/NewPassportApply/${id}`,data);
  }
  getReNewPassportById = (id:string):Observable<IReNewForm> =>{
    return this.http.get<IReNewForm>(`${this.myURL}/Re-NewPassport/${id}`)
  }

  editReNewPassportData = (id:string,data:IReNewForm):Observable<IReNewForm> =>{
    return this.http.put<IReNewForm>(`${this.myURL}/Re-NewPassport/${id}`,data);
  }

  updatePaymentStatus(id: string,data:INewPassportForm | IReNewForm | undefined,isReNew:Boolean|undefined): Observable<INewPassportForm | IReNewForm> {
    const url = isReNew ? `${this.myURL}/Re-NewPassport/${id}` : `${this.myURL}/NewPassportApply/${id}`;
    return this.http.put<INewPassportForm | IReNewForm>(url, data);
  }
}
