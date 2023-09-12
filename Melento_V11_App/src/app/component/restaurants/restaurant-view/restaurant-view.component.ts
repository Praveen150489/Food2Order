import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/restaurant.service';

@Component({
  selector: 'app-restaurant-view',
  templateUrl: './restaurant-view.component.html',
  styleUrls: ['./restaurant-view.component.css']
})
export class RestaurantViewComponent {
  restaurants:Restaurant[]=[]
  constructor(private restaurantService:RestaurantService,private router:Router){
    //this.restaurants=this.restaurantService.getRestaurants()
    this.restaurantService.getRestaurants().subscribe(data=>{
      this.restaurants=data
      console.log(this.restaurants);
    })
  }

  viewMenu(rest_id:number){
    this.router.navigate(['menu/'+rest_id]);
  }

  deleteRestaurant(uid:number){
    this.restaurantService.deleteRestaurant(uid).subscribe(data=>{
      console.log(data);
      location.reload();
    })
    // location.reload();
  }

  // deleteUser(uid:number){
  //   this.userService.deleteUser(uid);
  // }

  // viewDetails(uid:number){
  //   //this.userService.viewDetails(uid);
  //   this.router.navigate(['users/'+uid])
  // }
}
