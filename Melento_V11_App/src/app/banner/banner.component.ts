import { Component } from '@angular/core';
import { CardService } from '../card.service';
import { Cart } from '../models/card';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  //template:"<b>This is the banner template i.e View</b>",
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  productName: string;
  role: string | null=null
  email: string | null=null
  cardId:number=0      //parseInt(localStorage.getItem("user_id"))
  cart:Cart=new Cart(0,[],[],0,0)
  user_id=localStorage.getItem('user_id');

  constructor(private cardService:CardService){
    this.productName="Laptop"
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.email = localStorage.getItem('email');
  }

  // checkout(){
  //   let str = localStorage.getItem('user_id');
  //   if(str && str!=""){
  //     this.user_id=str;
  //     this.cardId = parseInt(this.user_id)
  //     //this.card=this.cardService.getCardById(this.cardId)
  //     //console.log(this.card)
  //   }
  //   this.cardService.getCardById(this.cardId).subscribe(data=>{
  //     this.cart=data;
  //   })
  //   this.cart.id=this.cardId;
  //   this.cart.user_id=this.cardId;
  //   this.card.items=[]
  //   this.cardService.updateCard(this.card).subscribe(data=>{
  //     console.log(data);
  //   })
  //   console.log(this.card);
  // }

  onSubmit(value: string): void{
    console.log('you submitted value: ',value);
  }

  clear(){
    localStorage.clear();
    location.reload();
    alert("Logout successfully!!!");
  }
}
