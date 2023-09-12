import { Injectable } from '@angular/core';
import { Cart } from './models/card';
// import { Item } from './models/item';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseUrl:string="http://localhost:3000"
  arrCarts:Cart[]=[
    // new Card(1,1,[1,2],[2,4],6),
    // new Card(2,2,[2],[3],3)
    //new Card(1,1,[new Item(1,1,[1,2],[10,20]),new Item(2,2,[1,2,3,4],[9,8,7,6])],100)
  ]
  cart:Cart=new Cart(0,[],[],0,0);

  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  //constructor() { }
  constructor(private httpClient:HttpClient) { }

  getCarts(): Observable<Cart[]>{
    return this.httpClient.get<Cart[]>(this.baseUrl+'/carts')
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  addCart(cart:Cart): Observable<Cart>{
    console.log(cart)
    return this.httpClient.post<Cart>(this.baseUrl+'/carts',JSON.stringify(cart),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  getCartById(cid:number): Observable<Cart>{
    return this.httpClient.get<Cart>(this.baseUrl+'/carts/'+cid)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  updatecart(u:Cart): Observable<Cart>{
    console.log(u);
    console.log(u.total);
    return this.httpClient.put<Cart>(this.baseUrl+'/carts/'+u.id,JSON.stringify(u),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  deletecart(uid:number): Observable<void>{
    return this.httpClient.delete<void>(this.baseUrl+'/carts/'+uid)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  // getCardById(uid:number): Observable<Card>{
  //   return this.httpClient.get<Card>(this.baseUrl + '/cards/' + uid)
  //   .pipe(catchError(this.httpError));
  // }


  
  // addToCart(u_id:number,rest_id:number,dish_id:number): Observable<Card>{
  //   this.getCardById(u_id).subscribe(data=>{
  //     this.card = data;
  //     console.log(this.card);
  //     let flag=false;
  //     for(let i=0;i<this.card.items.length;i++){
  //       if(this.card.items[i].rest_id == rest_id){
  //         for(let j=0;j<this.card.items[i].dish_ids.length;i++){
  //           if(this.card.items[i].dish_ids[j] == dish_id){
  //             this.card.items[i].number_of_each_dish[j]++;
  //             this.card.total++;
  //             flag=true;
  //             break;
  //           }
  //         }
  //         if(flag==false){
  //           this.card.items[i].dish_ids.push(dish_id);
  //           this.card.items[i].number_of_each_dish.push(1);
  //           this.card.total++;
  //           flag=true;
  //         }
  //         break;
  //       }
  //     }
  //     if(flag==false){
  //       this.card.items.push(new Item(0,rest_id,[dish_id],[1]));
  //     }
  //     console.log(this.card);

  //     // return this.httpClient.put<Card>(this.baseUrl+'/cards/'+u_id,JSON.stringify(this.card),this.httpHeader)
  //     // .pipe(
  //     //   retry(1),
  //     //   catchError(this.httpError)
  //     // );
  //   })
  //   // console.log(this.card);
  //   // let flag=false;
  //   // for(let i=0;i<this.card.items.length;i++){
  //   //   if(this.card.items[i].rest_id == rest_id){
  //   //     for(let j=0;j<this.card.items[i].dish_ids.length;i++){
  //   //       if(this.card.items[i].dish_ids[j] == dish_id){
  //   //         this.card.items[i].number_of_each_dish[j]++;
  //   //         this.card.total++;
  //   //         flag=true;
  //   //         break;
  //   //       }
  //   //     }
  //   //     if(flag==false){
  //   //       this.card.items[i].dish_ids.push(dish_id);
  //   //       this.card.items[i].number_of_each_dish.push(1);
  //   //       this.card.total++;
  //   //       flag=true;
  //   //     }
  //   //     break;
  //   //   }
  //   // }
  //   // if(flag==false){
  //   //   this.card.items.push(new Item(0,rest_id,[dish_id],[1]));
  //   // }
  //   // console.log(this.card);

  //   return this.httpClient.put<Card>(this.baseUrl+'/cards/'+u_id,JSON.stringify(this.card),this.httpHeader)
  //   .pipe(
  //     retry(1),
  //     catchError(this.httpError)
  //   );
  // }

  // updateCard(u:Card): Observable<Card>{
  //   return this.httpClient.put<Card>(this.baseUrl+'/cards/'+u.id,JSON.stringify(u),this.httpHeader)
  //   .pipe(
  //     retry(1),
  //     catchError(this.httpError)
  //   );
  // }

  /*
  addUser(u:User): Observable<User>{
    return this.httpClient.post<User>(this.baseUrl+'/users',JSON.stringify(u),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  updateUser(u:User): Observable<User>{
    return this.httpClient.put<User>(this.baseUrl+'/users/'+u.id,JSON.stringify(u),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }
  */
  

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

  // getCardById(id:number){
  //   for(let i=0;i<this.arrCards.length;i++){
  //     if(this.arrCards[i].id==id){
  //       this.card=this.arrCards[i];
  //       return this.card
  //     }
  //   }
  //   return this.card
  // }

  // addToCart(rest_id:number,dish_id:number){
  //   for(let i=0;i<this.arrCards.length;i++){
  //     if(this.arrCards[i].id==cardid){
  //       this.arrCards[i].dish_ids.push(dish_id)
  //     }
  //   }
  // }
}
