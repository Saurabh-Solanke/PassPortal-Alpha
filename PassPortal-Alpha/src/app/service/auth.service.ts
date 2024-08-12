import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from '../interfaces/user.interface'; // Adjust the path if necessary

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  signup(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, user).pipe(
      catchError((error) => this.handleError('register', error))
    );
  }

  login(credentials: any): Observable<User | null> {
    return this.http
      .get<User[]>(`${this.baseUrl}?email=${credentials.email}&password=${credentials.password}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            const user = users[0];
            if (user.accountStatus === 'Active') {
              return user;
            } else {
              Swal.fire(
                'Account Inactive',
                'Your account is inactive. Please contact support.',
                'warning'
              );
              return null;
            }
          } else {
            return null;
          }
        }),
        catchError((error) => this.handleError('login', error))
      );
  }

  emailExists(email: string): Observable<boolean> {
    console.log(`Checking if email exists: ${email}`); // Added line
    return this.http
      .get<User[]>(`${this.baseUrl}?email=${email}`)
      .pipe(
        map(users => {
          console.log('API Response:', users); // Added line
          console.log(`Users found: ${users.length}`); // Added line
          return users.length > 0;
        }),
        catchError((error) => this.handleError('check email', error))
      );
  }

  private handleError(operation = 'operation', error: any): Observable<any> {
    console.error(`${operation} failed: ${error.message}`);
    Swal.fire(
      'Error',
      `${operation.charAt(0).toUpperCase() + operation.slice(1)} failed: Failed to connect to the server.`,
      'error'
    );
    return throwError(error);
  }
}
