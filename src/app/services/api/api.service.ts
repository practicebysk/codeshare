import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  // private readonly baseUrl = 'http://localhost:3000/api';
  private readonly baseUrl = 'https://codeshare-server-m9rm.onrender.com/api';


  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data)
      .pipe(catchError(this.handleError));
  }

  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${params}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let message = 'Something went wrong. Please try again.';
    if (error.error?.message) {
      message = error.error.message;
    } else if (error.status === 0) {
      message = 'Cannot connect to server. Check your internet or backend.';
    }
    return throwError(() => new Error(message));
  }
}
