import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Address } from './models/address';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
// import { Cart } from './models/card';
import { User_Jwt } from './models/user_jwt';
import { Course } from './models/course';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // viewDetails(uid: number) {
  //   throw new Error('Method not implemented.');
  // }

  baseUrl:string="http://localhost:3000"
  secondBaseUrl:string="http://localhost:3500"
  token:any=new Object();
  arrUsers:User[]=[
  //   new User(1,"John","Jose","Hugh","abc123@gmail.com","xyz@123","12th July 1998","9876543210",new Address(100,"527","5th Main","Mvm","Blr","India","560003"),"user"),
  //   new User(2,"Praveen","Prakash","Choudhary","prakashpraveen929@gmail.com","praveen@123","15th April 2000","7050847592",new Address(101,"527","8th Main","Indira Nagar","Blr","India","560006"),"admin"),
  //   new User(3,"Rahul","Kumar","Singh","singhrahul123@gmail.com","rahul@123","15th April 2000","7050847592",new Address(102,"527","8th Main","Indira Nagar","Blr","India","560006"),"admin")
  ]

  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }


  constructor(private httpClient:HttpClient) { }

  // getUsers(){
  //   return this.arrUsers
  // }

  getUser(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseUrl + '/users')
    .pipe(catchError(this.httpError));
  }

  // getAddedUsers(){
  //   return this.arrAddedUsers
  // }

  // getUpdateUsers(){
  //   return this.arrUpdateUsers
  // }

  // addUser(u:User){
  //   this.arrUsers.push(u)
  //   console.log(this.arrUsers)
  // }
  addUser(u:User): Observable<any>{
    // let card = new Card(u.id,u.id,[],0);
    // this.httpClient.post<Card>(this.baseUrl+'/cards',JSON.stringify(card),this.httpHeader)
    
    return this.httpClient.post<User>(this.baseUrl+'/users',JSON.stringify(u),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }


  // updateUser(u:User){
  //   for(var i=0;i<this.arrUsers.length;i++){
  //     if(u.id==this.arrUsers[i].id){
  //       this.arrUsers[i]=u;
  //     }
  //   }

  //   this.arrUsers.forEach(u=>{
  //     console.log(u)
  //   })
  // }
  updateUser(u:User): Observable<User>{
    return this.httpClient.put<User>(this.baseUrl+'/users/'+u.id,JSON.stringify(u),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }


  // deleteUser(uid:number){
  //   for(var i=0;i<this.arrUsers.length;i++){
  //     if(uid==this.arrUsers[i].id){
  //       this.arrUsers.splice(i,1);
  //     }
  //   }
  //   this.arrUsers.forEach(u=>{
  //     console.log(u);
  //   })
  // }
  deleteUser(uid:number): Observable<void>{
    return this.httpClient.delete<void>(this.baseUrl+'/users/'+uid)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }


  
  // viewDetails(uid:number){
  //   for(var i=0;i<this.arrUsers.length;i++){
  //     if(uid==this.arrUsers[i].id){
  //       console.log(this.arrUsers[i]);
  //     }
  //   }
  // }

  // getUserbyId(uid:number){
  //   let user=new User(0,'','','','','','','',new Address(0,'','','','','',''),'');
  //   for(var i=0;i<this.arrUsers.length;i++){
  //     if(uid==this.arrUsers[i].id){
  //       user=this.arrUsers[i];
  //       return user;
  //     }
  //   }
  //   return user;
  // }

  getUserById(uid:number): Observable<User>{
    return this.httpClient.get<User>(this.baseUrl + '/users/' + uid)
    .pipe(catchError(this.httpError));
  }

  /*getUserByEmail(email: string): Observable<User | undefined> {
    return this.httpClient.get<User[]>(`${this.baseUrl}?email=${email}`)
      .pipe(
        map(users => users[0]), // Assuming email is unique, so getting the first user
        catchError(this.httpError)
      );
  }*/

  registerUser(u:User_Jwt): Observable<User_Jwt>{
    return this.httpClient.post<User_Jwt>(this.secondBaseUrl+'/auth/register',JSON.stringify(u),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  loginUser(u:User_Jwt): string{
    console.log('method called')
    let jwt_result=this.httpClient.post<string>(this.secondBaseUrl+'/auth/login',JSON.stringify(u),this.httpHeader)
    .pipe(
      //retry(1),
      catchError(this.httpError)
    );
    jwt_result.subscribe((data:string)=>{
      this.token=data
      console.log(this.token)
      return this.token
    })
    return "empty"
  }

  getAllCourses():Observable<Course[]>{
    return this.httpClient.get<Course[]>(this.secondBaseUrl + '/courses')
    .pipe(catchError(this.httpError));
  }

  addCourse(c:Course): Observable<Course>{
    let httpHeader_jwt={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':'JWT '+this.token['token']
      })
    }
    return this.httpClient.post<Course>(this.secondBaseUrl+'/courses',JSON.stringify(c),httpHeader_jwt)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
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

}
