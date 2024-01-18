import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  getRoads(): Observable<string[]> {
    return this.getData<{ roads: string[] }>(
      'https://verkehr.autobahn.de/o/autobahn/'
    ).pipe(
      map((responseData: { roads: string[] }) => responseData.roads),
      catchError((error) => {
        console.error(error);
        return throwError('An error occurred while fetching roads data.');
      })
    );
  }
}
