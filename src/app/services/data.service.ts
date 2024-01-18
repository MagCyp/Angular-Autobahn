import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'https://verkehr.autobahn.de/o/autobahn/';

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error(error);
    return throwError('An error occurred.');
  }

  private getData<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(catchError(this.handleError));
  }

  getRoads(): Observable<string[]> {
    const roadsUrl = `${this.baseUrl}`;
    return this.getData<{ roads: string[] }>(roadsUrl).pipe(
      map((responseData) => responseData.roads)
    );
  }

  getObjectData<T>(element: string, service: string): Observable<T> {
    const url = `${this.baseUrl}${element}/services/${service}`;
    return this.getData<T>(url).pipe(map((responseData) => responseData));
  }
}
