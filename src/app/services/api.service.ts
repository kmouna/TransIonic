//api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Chauffeur } from '../models/chauffeur';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  // API path
  base_path_chauffeurs = 'http://127.0.0.1:8000/api/chauffeurs';
 
  constructor(private http: HttpClient) { }
 
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
 
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  // Get single Chauffeur data by ID
  getChauffeur(id): Observable<Chauffeur> {
    return this.http
      .get<Chauffeur>(this.base_path_chauffeurs + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  //--------------**** Start CRUD Chauffeurs***----------------------//
 // Create a new chauffeur
  /*createChauffeur(chauff): Observable<Chauffeur> {
    return this.http
      .post<Chauffeur>(this.base_path_chauffeurs, JSON.stringify(chauff), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }*/
  // Get Chauffeurs data
 /* getTsChauffeurs(): Observable<Chauffeur> {
    return this.http
      .get<Chauffeur>(this.base_path_chauffeurs)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }*/
 
  // Update item by id
  /*updateChauffeur(id, chauff): Observable<Chauffeur> {
    return this.http
      .put<Chauffeur>(this.base_path_chauffeurs + '/' + id, JSON.stringify(chauff), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }*/
 
  // Delete item by id
 /* deleteChauffeur(id) {
    return this.http
      .delete<Chauffeur>(this.base_path_chauffeurs + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }*/
   //--------------**** End CRUD Chauffeurs***----------------------//
}
