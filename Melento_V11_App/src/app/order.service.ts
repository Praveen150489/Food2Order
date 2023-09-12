import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './models/order';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl:string="http://localhost:3000"

  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private httpClient:HttpClient) { }

  getOrders(): Observable<Order[]>{
    return this.httpClient.get<Order[]>(this.baseUrl + '/orders')
    .pipe(catchError(this.httpError));
  }

  addOrder(u:Order): Observable<Order>{
    return this.httpClient.post<Order>(this.baseUrl+'/orders',JSON.stringify(u),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  getOrderById(rest_id:number): Observable<Order>{
    return this.httpClient.get<Order>(this.baseUrl + '/orders/' + rest_id)
    .pipe(catchError(this.httpError));
  }


  updateOrder(u:Order): Observable<Order>{
    return this.httpClient.put<Order>(this.baseUrl+'/orders/'+u.id,JSON.stringify(u),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }


  httpError(error:HttpErrorResponse){
    let msg='';
    if(error.error instanceof ErrorEvent){
      msg=error.error.message;
    }
    else{
      msg=`Error Code:${error.status}\nMessafe:${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }

  //constructor() { }
}
