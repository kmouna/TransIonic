//api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Chauffeur } from '../models/chauffeur';
import { Transfert } from '../models/transfert';
import { TransfertIntermediaire } from '../models/transfert-intermediaire';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  // API path
  base_path_chauffeurs = 'http://127.0.0.1:8000/api/chauffeurs';
  base_path_transferts = 'http://127.0.0.1:8000/api/transferts';
  base_path_transferts_intermediaires = 'http://127.0.0.1:8000/api/transintermediaires'
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
  // Get single TransfertIntermediaire data by ID
  getTransIntermediaire(id): Observable<TransfertIntermediaire> {
    return this.http
      .get<TransfertIntermediaire>(this.base_path_transferts_intermediaires + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  // Get single Transfert data by ID
  getTransfert(id): Observable<Transfert> {
    return this.http
      .get<Transfert>(this.base_path_transferts + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  // Get All transferts chauffeurs by ID and date
  getSesTransferts(id, date): Observable<Transfert> {
    return this.http
      .get<Transfert>(this.base_path_transferts + '/' + id + '/' + date)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  // Get All transfertsIntermediaires of one transfert by ID
  getTransIntermediaires(idtrans): Observable<TransfertIntermediaire> {
    return this.http
      .get<TransfertIntermediaire>(this.base_path_transferts_intermediaires + '/transfert/' + idtrans)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update TransfertIntermediaire by id
  updateTransfertIntermediaire(idtransinter,transinter): Observable<TransfertIntermediaire> {
    return this.http
      .patch<TransfertIntermediaire>(this.base_path_transferts_intermediaires + '/' + idtransinter, JSON.stringify(transinter), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
// Get Chauffeur by email and pw
getChauffeurByLogin(email,mp): Observable<Chauffeur> {
  return this.http
    .get<Chauffeur>(this.base_path_chauffeurs + '/' + email + '/' + mp)
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
