import { Component } from '@angular/core';
import { Cart } from 'src/app/models/card';
import { CardService } from 'src/app/card.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Dish } from 'src/app/models/dish';
//import { DishService } from 'src/app/dish.service';
import { RestaurantService } from 'src/app/restaurant.service';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  cartId:number=0;      //parseInt(localStorage.getItem("user_id"))
  count=0;
  total_amt=0;
  amt=0;
  cart:Cart=new Cart(0,[],[],0,0)
  carts:Cart[]=[]
  arrDishes:Dish[]=[]
  dish:Dish = new Dish(0,'',0,'','','','','');
  user_id:string = "";
  order:Order = new Order(0,0,'',[],[],0,0);
  orders:Order[]=[];

  date = new Date()

  currentYear = this.date.getUTCFullYear()
  currentMonth = this.date.getUTCMonth() +1
  currentDay = this.date.getUTCDate()

  currentdate:string=""
  FinalMonth:any
  FinalDay:any



  ngOnInit():void{
    if(this.currentMonth < 10){
      this.FinalMonth = "0" + this.currentMonth
    }else{
      this.FinalMonth = this.currentMonth
    }

    if(this.currentDay < 10){
      this.FinalDay = "0" + this.currentDay
    }else{
      this.FinalDay = this.currentDay 
    }

    this.currentdate = this.currentYear + "-" + this.FinalMonth + "-" + this.FinalDay
  }

  // ngOnInit(): void {
  //   let str = localStorage.getItem('user_id');
  //   if(str && str!=""){
  //     this.user_id=str;
  //     this.cardId = parseInt(this.user_id)
  //     //this.card=this.cardService.getCardById(this.cardId)
  //     console.log(this.card)
  //   }
  // }

  // constructor(private cardService:CardService){
  //   this.card=this.cardService.getCardById(this.cardId)
  //   console.log(this.card)
  // }

  constructor(private activatedRoute: ActivatedRoute,private cardService:CardService,private restaurantService:RestaurantService,private orderService:OrderService){
    // let str = localStorage.getItem('user_id');
    // if(str && str!=""){
    //   this.user_id=str;
    //   this.cardId = parseInt(this.user_id)
    //   //this.card=this.cardService.getCardById(this.cardId)
    //   //console.log(this.card)
    // }
    // this.cardService.getCardById(this.cardId).subscribe(data=>{
    //   this.cart=data;
    // })
    // this.cart.id=this.cardId;
    // //this.cart.user_id=this.cardId;
    // console.log(this.cart);

    let str = localStorage.getItem('user_id');
    if(str && str!=null){
      this.cartId=parseInt(str);
    }
    this.cardService.getCartById(this.cartId).subscribe(data=>{
      this.cart=data;
      console.log(data);
      let rest_id=this.cart.cart_restaurant_id;
      this.restaurantService.getRestaurantById(rest_id).subscribe(data=>{
        console.log(data);
        this.cart.dish_ids.forEach(did=>{
          data.r_Dishes.forEach(r_d=>{
            if(did==r_d.id){
              this.arrDishes.push(r_d);
            }
          })
        })
        console.log(this.arrDishes);
        this.total();
      })
    })

    this.orderService.getOrders().subscribe(data=>{
      this.orders=data
    })
  }


  increment(did:number){
    let c=0;
    this.cart.dish_ids.forEach(dish_id=>{
      if(did==dish_id){
        this.cart.number_of_each_dish[c]=this.cart.number_of_each_dish[c]+1;
      }
      c=c+1;
    })
    this.total();
  }


  decrement(did:number){
    let c = 0;
    this.cart.dish_ids.forEach(dish_id=>{
      if(did==dish_id){
        this.cart.number_of_each_dish[c]-=1;
      }
      c=c+1;
    })
    this.total();
  }


  total(){
    this.total_amt=0;
    for(var i=0;i<this.arrDishes.length;i++){
      this.total_amt+=this.arrDishes[i].d_Cost * this.cart.number_of_each_dish[i];
    }
    console.log(this.total_amt);
    this.cart.total=this.total_amt
    console.log(this.cart.total)
    this.cardService.updatecart(this.cart).subscribe(d=>{
      console.log(d)
    })
  }

  clearcart(){
    this.cart.dish_ids=[]
    this.cart.number_of_each_dish=[]
    this.cart.total=0;
    this.cart.cart_restaurant_id=0;
    this.cardService.updatecart(this.cart).subscribe(d=>{
      console.log(d);
      location.reload();
    })
  }

  checkout(){
    var tempId=0;
    var maxId=0;
    this.orders.forEach(u =>{
      if(maxId < u.id){
        maxId=u.id;
      }
    })
    tempId=maxId;
    tempId=tempId+1;
    console.log(tempId)
    this.order.id=tempId
    this.order.restaurant_id=this.cart.cart_restaurant_id
    this.order.order_date = this.currentdate
    this.order.dishes_ids=this.cart.dish_ids
    this.order.num_of_dishes=this.cart.number_of_each_dish
    this.order.user_id=this.cart.id
    this.order.total_order=this.cart.total

    this.orderService.addOrder(this.order).subscribe(data=>{
      console.log(data)
      //location.reload();
      this.cart.dish_ids=[]
      this.cart.number_of_each_dish=[]
      this.cart.total=0;
      this.cart.cart_restaurant_id=0;
      this.cardService.updatecart(this.cart).subscribe(d=>{
        console.log(d);
        location.reload();
      })
    })

  }
  
}
