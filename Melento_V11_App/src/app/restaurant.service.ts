import { Injectable } from '@angular/core';
import { Restaurant } from './models/restaurant';
import { Address } from './models/address';
import { Dish } from './models/dish';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  baseUrl:string="http://localhost:3000"
  arrRestaurants:Restaurant[]=[
  //   new Restaurant(1001,"KFC","assets/images/restaurant1.png",[new Address(576,"107","11th Main Road","Kormagala","Bangalore","India","560011"),new Address(578,"109","11th Main Road","Kormagala","Bangalore","India","560011")],[new Dish(100,"Chicken Burger",199,"A burger is a flat round mass of minced meat","Turkey burger","zzz","Non-Veg"),new Dish(101,'Chow Mein',75,'maggie and souce','dghfjd ghfjfd sdhgff','sjdhfkj hfdhsfk','Veg')]),
  //   new Restaurant(1002,"Mac Donal","assets/images/restaurant2.png",[new Address(577,"108","11th Main Road","Kormagala","Bangalore","India","560011")],[new Dish(102,"Chicken Burger",199,"A burger is a flat round mass of minced meat","Turkey burger","zzz","Non-Veg")])
  ]

  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private httpClient:HttpClient) { }
  
  // this.restaurantService.getRestaurants().subscribe(data=>{
  //   this.restaurants=data
  // })


  getRestaurantByName(r_name:string): Restaurant{

    // return this.httpClient.get<Restaurant>(this.baseUrl + '/restaurants/' + r_name)
    // .pipe(catchError(this.httpError));
    let res=this.httpClient.get<Restaurant[]>(this.baseUrl + '/restaurants')
    .pipe(catchError(this.httpError));
    // this.getRestaurants().subscribe(data=>{
    //   this.arrRestaurants=data;
    // })
    res.subscribe(data=>{
      this.arrRestaurants=data;
      for(let i=0;i<this.arrRestaurants.length;i++){
        if(this.arrRestaurants[i].r_Name==r_name){
          //return this.arrRestaurants[i];
          return this.arrRestaurants[i];
        }
      }
      return new Restaurant(0,'','',[],[],0);
    })
    return new Restaurant(0,'','',[],[],0);
    
  }

  getRestaurants(): Observable<Restaurant[]>{
    return this.httpClient.get<Restaurant[]>(this.baseUrl + '/restaurants')
    .pipe(catchError(this.httpError));
  }

  getRestaurantById(rest_id:number): Observable<Restaurant>{
    return this.httpClient.get<Restaurant>(this.baseUrl + '/restaurants/' + rest_id)
    .pipe(catchError(this.httpError));
  }
  
  addRestaurant(u:Restaurant): Observable<Restaurant>{
    return this.httpClient.post<Restaurant>(this.baseUrl+'/restaurants',JSON.stringify(u),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  updateRestaurant(u:Restaurant): Observable<Restaurant>{
    return this.httpClient.put<Restaurant>(this.baseUrl+'/restaurants/'+u.id,JSON.stringify(u),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  deleteRestaurant(uid:number): Observable<void>{
    return this.httpClient.delete<void>(this.baseUrl+'/restaurants/'+uid)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }


  // addedRestaurants:Restaurant[]=[
  //   new Restaurant(1001,"KFC","assets/images/restaurant1.png",[new Address(576,"107","11th Main Road","Kormagala","Bangalore","India","560011")]),
  //   new Restaurant(1002,"Mac Donal","assets/images/restaurant2.png",[new Address(577,"108","11th Main Road","Kormagala","Bangalore","India","560011")]),
  //   new Restaurant(1002,"IronHills","assets/images/restaurant3.png",[new Address(578,"109","11th Main Road","Kormagala","Bangalore","India","560011")])
  // ]

  // updateRestaurants:Restaurant[]=[
  //   new Restaurant(1001,"KFC","assets/images/restaurant1.png",[new Address(576,"107","11th Main Road","Kormagala","Bangalore","India","560011")]),
  //   new Restaurant(1002,"Mac Donal","assets/images/restaurant2.png",[new Address(577,"108","11th Main Road","Kormagala","Bangalore","India","560011")]),
  //   new Restaurant(1002,"IronHills","assets/images/restaurant3.png",[new Address(578,"109","11th Main Road","Kormagala","Bangalore","India","560011")]),
  //   new Restaurant(1001,"KFC","assets/images/restaurant1.png",[new Address(576,"107","11th Main Road","Kormagala","Bangalore","India","560011")]),
  //   new Restaurant(1002,"Mac Donal","assets/images/restaurant2.png",[new Address(577,"108","11th Main Road","Kormagala","Bangalore","India","560011")])
  // ]
  
  //constructor() { }

  // getRestaurants(){
  //   return this.arrRestaurants
  // }

  // getAddedRestaurants(){
  //   return this.addedRestaurants
  // }

  // addRestaurant(u:Restaurant){
  //   this.arrRestaurants.push(u);
  //   console.log(u);
  //   console.log(this.arrRestaurants);
  // }

  // getRestaurantById(rest_id:number){
  //   let restaurant=new Restaurant(0,'','',[],[]);
  //   for(let i=0;i<this.arrRestaurants.length;i++){
  //     if(this.arrRestaurants[i].id==rest_id){
  //       restaurant=this.arrRestaurants[i];
  //       return restaurant
  //     }
  //   }
  //   return restaurant
  // }
  

  // getUpdateRestaurants(){
  //   return this.updateRestaurants
  // }

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

}
