import { Component } from '@angular/core';
import { User } from '../models/user';
import { Address } from '../models/address';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  //restaurant_name:string="Ganesh Food Joint"
  //arrRestaurants:string[]=["Ganesh Food Joint","ITC Bakes","Bharatiya Jalpan"];
  arrRestaurants:[any[],any[],any[]]=[["Ganesh Food Joint","Mvm","Closed","assets/images/restaurant1.png",["Chow Mein","Idli","Masala Dosa"]],["ITC Bakes","Rajajinagar","Open","assets/images/restaurant2.png",["French Fried","Burger","Choka bar","Chicken Wings"]],["Bharatiya Jalpan","Indira Nagar","Open","assets/images/restaurant3.png",["Ice cream","Cold drink"]]];
  
  arrUsers:User[]=[
    new User(1,"John","Jose","Hugh","abc123@gmail.com","xyz@123","12th July 1998","9876543210",new Address(100,"527","5th Main","Mvm","Blr","India","560003"),"user"),
    new User(2,"Praveen","Prakash","Choudhary","prakashpraveen929@gmail.com","praveen@123","15th April 2000","7050847592",new Address(200,"527","8th Main","Indira Nagar","Blr","India","560006"),"admin")
  ]
  // create dishes for each restaurant in neste array in above array;
}
