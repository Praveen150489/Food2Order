import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/restaurant.service';

@Component({
  selector: 'app-view-owner-restaurants',
  templateUrl: './view-owner-restaurants.component.html',
  styleUrls: ['./view-owner-restaurants.component.css']
})
export class ViewOwnerRestaurantsComponent {
  restaurants:Restaurant[]=[]
  allRestaurants:Restaurant[]=[]
  constructor(private restaurantService:RestaurantService,private router:Router){
    let str=localStorage.getItem('user_id');
    if(str && str!=""){
      let user_id=parseInt(str);
      //this.restaurants=this.restaurantService.getRestaurants()
      this.restaurantService.getRestaurants().subscribe(data=>{
        this.allRestaurants=data
        console.log(this.allRestaurants);
        for(let i=0;i<this.allRestaurants.length;i++){
          if(this.allRestaurants[i].r_Owner_Id == user_id){
            this.restaurants.push(this.allRestaurants[i]);
          }
        }
        console.log(this.restaurants);
      })
    }
  }

  viewMenu(rest_id:number){
    this.router.navigate(['menu/'+rest_id]);
  }

  deleteRestaurant(uid:number){
    this.restaurantService.deleteRestaurant(uid).subscribe(data=>{
      console.log(data);
    })
    location.reload();
  }
}
