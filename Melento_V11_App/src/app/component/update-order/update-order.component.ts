import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent {
  order:Order=new Order(0,0,'',[],[],0,0);
  ordersArr:Order[]=[];
  idUpdated:number=0;
  submitted = false;

  myForm: FormGroup;
  id: AbstractControl;
  restId: AbstractControl;
  orderDate: AbstractControl;
  dishesIds: AbstractControl;
  numDishes: AbstractControl;
  userId: AbstractControl;
  totalOrder: AbstractControl;

  constructor(fb: FormBuilder,private orderService:OrderService) {
    //this.ordersArr=this.orderService.getOrders()
    this.orderService.getOrders().subscribe(data=>{
      this.ordersArr=data
    })
    this.myForm = fb.group({
      'id': ['',Validators.required],
      'restId': ['',Validators.required],
      'orderDate': ['',Validators.required],
      'dishesIds': ['',Validators.required],
      'numDishes': ['',Validators.required],
      'userId': ['',Validators.required],
      'totalOrder': ['',Validators.required]
    });
    this.id=this.myForm.controls['id'];
    this.restId=this.myForm.controls['restId'];
    this.orderDate=this.myForm.controls['orderDate'];
    this.dishesIds=this.myForm.controls['dishesIds'];
    this.numDishes=this.myForm.controls['numDishes'];
    this.userId=this.myForm.controls['userId'];
    this.totalOrder=this.myForm.controls['totalOrder'];
  }
  ngOnInit(){
    //this.usersArr=this.UserService.getUsers()
    this.orderService.getOrders().subscribe(data=>{
      this.ordersArr=data
    })
  }
  get f(){return this.myForm.controls}

  onChangeType(evt: any){
    console.log(evt.target.value);
    var idObtained=evt.target.value;
    this.idUpdated=parseInt(idObtained.split(':')[1].trim());

    for(var i=0;i<this.ordersArr.length;i++){
      if(this.idUpdated==this.ordersArr[i].id){
        this.order=this.ordersArr[i];
      }
    }

    this.myForm.get('id')?.setValue(this.order.id.toString())
    this.myForm.get('id')?.setValue(this.order.id.toString())
    this.myForm.get('restId')?.setValue(this.order.restaurant_id.toString())
    this.myForm.get('orderDate')?.setValue(this.order.order_date.toString())
    this.myForm.get('dishesIds')?.setValue(this.order.dishes_ids.toString())
    this.myForm.get('numDishes')?.setValue(this.order.num_of_dishes.toString())
    this.myForm.get('userId')?.setValue(this.order.user_id.toString())
    this.myForm.get('totalOrder')?.setValue(this.order.total_order.toString())
  }

  onSubmit(myForm: any): void {
    this.submitted=true;
    // if(this.myForm.invalid){
    //   return;
    // }
    console.log(myForm.controls.restId.value);
    console.log(myForm.controls.id.value)
    console.log('you submitted value: ', myForm.controls.id.value,myForm.controls.restId.value,myForm.controls.orderDate.value,myForm.controls.dishesIds.value,myForm.controls.numDishes.value,myForm.controls.userId.value,myForm.controls.totalOrder.value);
    var tempId=0;
    // var maxId=0;
    // this.usersArr.forEach(u =>{
    //   if(maxId < u.id){
    //     maxId = u.id;
    //   }
    // })
    //tempId = maxId;
    tempId = this.idUpdated;
    //tempId = tempId + 1;
    this.order=new Order(0,0,'',[],[],0,0);
    let ID=myForm.controls.id.value
    let r_I=myForm.controls.restId.value
    let o_D=myForm.controls.orderDate.value
    let d_Ids=myForm.controls.dishesIds.value
    let num_Dishes=myForm.controls.numDishes.value
    let u_Id=myForm.controls.userId.value
    let t_O=myForm.controls.totalOrder.value

    this.order.id=ID;
    this.order.restaurant_id=r_I;
    this.order.order_date=o_D;
    this.order.dishes_ids=d_Ids;
    this.order.num_of_dishes=num_Dishes;
    this.order.user_id=u_Id;
    this.order.total_order=t_O;
    if(ID!=null && r_I!=null && o_D!=null && d_Ids!=null && num_Dishes!=null && u_Id!=null && t_O!=null){
      this.order=new Order(ID,r_I,o_D,d_Ids,num_Dishes,u_Id,t_O);
      console.log(this.order);
      //this.UserService.addUser(this.user)
      this.orderService.updateOrder(this.order).subscribe(data=>{
        console.log(data);
      })
    }
    location.reload();
  }
}
