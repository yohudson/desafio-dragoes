import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Dragao } from '../models/dragao'
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DragaoService {

  url = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  
  Get(): Observable<Dragao[]> {
    return this.httpClient.get<Dragao[]>(this.url)
      .pipe(
        //retry(2),
        catchError(this.handleError))
  }

  Post(dragao: Dragao): Observable<Dragao> {
    return this.httpClient.post<Dragao>(this.url, JSON.stringify(dragao), this.httpOptions)
      .pipe(
        //retry(2),
        catchError(this.handleError)
      )
  }

  GetById(id: number): Observable<Dragao> {
    return this.httpClient.get<Dragao>(this.url + '/' + id)
      .pipe(
        //retry(2),
        catchError(this.handleError)
      )
  }

  Put(dragao: Dragao): Observable<Dragao> {
    return this.httpClient.put<Dragao>(this.url + '/' + dragao.id, JSON.stringify(dragao), this.httpOptions)
      .pipe(
        //retry(1),
        catchError(this.handleError)
      )
  }

  Delete(dragao: Dragao) {
    return this.httpClient.delete<Dragao>(this.url + '/' + dragao.id, this.httpOptions)
      .pipe(
        //retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      Swal.close()
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      Swal.close()
    }
    console.log(errorMessage);
    Swal.close()
    return throwError(errorMessage);
  };

}