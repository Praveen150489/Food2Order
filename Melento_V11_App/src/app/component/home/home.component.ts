import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router:Router){}

  viewMenu(rest_id:number){
    this.router.navigate(['menu/'+rest_id]);
  }

  viewRestaurants(){
    this.router.navigate(['restaurants'])
  }
}
