import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CardService } from 'src/app/card.service';
import { Cart } from 'src/app/models/card';
import { Dish } from 'src/app/models/dish';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  shouldGreyOut: boolean = true;
  rest_id:number
  dishes:Dish[]=[]
  rest:Restaurant=new Restaurant(0,'','',[],[],0);
  user_id:string = "";
  cartId:number = 0;
  arrCarts:Cart[]=[]
  cart:Cart = new Cart(0,[],[],0,0)
  cartidFound:number=0;
  disabledFlag:boolean=false
  arrD_ids:number[]=[]
  dish:Dish=new Dish(0,'',0,'','','','','');
  r_id:number=0;
  str_role: string | null=null


  constructor(private activatedRoute: ActivatedRoute,private restaurantService:RestaurantService,private cartService:CardService){
    this.rest_id=0;
    this.activatedRoute.params.subscribe((params: Params) =>{
      let str=params['id'];
      if(str && str!=null){
        this.r_id=parseInt(str);
      }
      console.log(this.r_id);
      this.restaurantService.getRestaurantById(this.r_id).subscribe(data=>{
        this.rest=data;
        console.log(this.rest);
        this.dishes=this.rest.r_Dishes;
        console.log(this.dishes);
        this.rest_id=this.r_id;
        console.log(this.rest_id);
      })
      //this.dishes=this.rest.r_Dishes;
      //console.log(this.dishes);
    })

    let str = localStorage.getItem('user_id');
    if(str && str!=""){
      this.user_id=str;
      this.cartId = parseInt(this.user_id)
    }
    this.str_role = localStorage.getItem('role');
  }

  AddDish(rest_id:number,dish_id:number){
    //alert("hello everyone");
    this.disabledFlag=true
    let str=localStorage.getItem('user_id')
    console.log(str);
    if(str && str!=null){
      this.cartId=parseInt(str);
      console.log(this.cartId);
    }
    this.cartService.getCartById(this.cartId).subscribe(data=>{
      this.disabledFlag=true
      this.cart=data
      this.arrD_ids=this.cart.dish_ids
      console.log(data)
      console.log(this.cart.dish_ids)
    
   
  
      let price=this.dish.d_Cost
      
    
      this.cart.id=this.cartId
      this.cart.cart_restaurant_id=this.rest_id
      if(this.arrD_ids.length==0){
        this.arrD_ids.push(dish_id)
      }else{
       console.log("in else "+ this.cart.dish_ids)
      let flag=0
      for(let i=0;i<this.arrD_ids.length;i++){
        console.log(this.arrD_ids[i],dish_id)
        if(this.arrD_ids[i]==dish_id){
            console.log("dish exits "+this.cart.dish_ids[i])
            flag=1
            break;
        }
      }
    if(flag==0){
      this.arrD_ids.push(dish_id)
    }
    this.cart.dish_ids=this.arrD_ids
    }
      console.log(this.cart.dish_ids)
      let count=0
      this.cart.dish_ids.forEach(d=>{
        if(this.cart.number_of_each_dish[count]== null){
          this.cart.number_of_each_dish[count]=0
        }
        if (d==dish_id){
          this.cart.number_of_each_dish[count]+=1
          console.log(this.cart.number_of_each_dish)
        }
        count+=1
      })
      console.log(this.cart.number_of_each_dish)
      // for(var i=0;i<this.carts.dish_ids.length;i++){
      //   this.restaurantService.getRestaurantbyId(r_id).subscribe(res=>{
      //     console.log(res)
      //     let arrdishes=res.r_dishes
          
          
      //   })
      // }
      //this.cart.total=0
      //this.cart.number_of_each_dish=[]
      //this.carts.id=rid
      //this.cart=new Cart(this.cart.id,this.cart.dish_ids,this.cart.number_of_each_dish,this.cart.cart_restaurant_id,price)
      console.log(this.cart)
      
      this.cartService.updatecart(this.cart).subscribe(data=>{
        this.disabledFlag=true
        console.log(data)
        location.reload()
      })
    })
  //this.carts = new Cart(0,[],[],0,0)
  }

}
