import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  //@Input() restaurant:any[]=[]
  restaurants:Restaurant[]=[];
  pagedRestaurants: Restaurant[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor(private restaurantService: RestaurantService,private router:Router) { }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.restaurantService.getRestaurants().subscribe(data=>{
      this.restaurants=data;
      this.updatePagedRestaurants();
    })
      // .subscribe(
      //   (data: Restaurant[]) => {
      //     this.restaurants = data;
      //     this.updatePagedRestaurants();
      //   },
      //   error => {
      //     console.error('Error fetching restaurants:', error);
      //   }
      // );
  }

  updatePagedRestaurants() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedRestaurants = this.restaurants.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagedRestaurants();
  }

  get pages(): number[] {
    const pageCount = Math.ceil(this.restaurants.length / this.itemsPerPage);
    return new Array(pageCount).fill(0).map((_, i) => i + 1);
  }

  // constructor(private restaurantService:RestaurantService,private router:Router){
  //   //this.restaurants=this.restaurantService.getRestaurants();
  //   this.restaurantService.getRestaurants().subscribe(data=>{
  //     this.restaurants=data
  //   })
  // }

  viewMenu(rest_id:number){
    this.router.navigate(['menu/'+rest_id]);
  }
}
