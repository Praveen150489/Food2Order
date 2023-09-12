import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {

  order:Order=new Order(0,0,'',[],[],0,0);
  ordersArr:Order[]=[];
  submitted = false;

  myForm: FormGroup;
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
      'restId': ['',Validators.required],
      'orderDate': ['',Validators.required],
      'dishesIds': ['',Validators.required],
      'numDishes': ['',Validators.required],
      'userId': ['',Validators.required],
      'totalOrder': ['',Validators.required]
    });

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

  onSubmit(myForm: any): void {
    this.submitted=true;
    if(this.myForm.invalid){
      return;
    }
    console.log(myForm.controls.restId.value);
    console.log('you submitted value: ', myForm.controls.restId.value,myForm.controls.orderDate.value,myForm.controls.dishesIds.value,myForm.controls.numDishes.value,myForm.controls.userId.value,myForm.controls.totalOrder.value);
    var tempId=0;
    var maxId=0;
    this.ordersArr.forEach(u =>{
      if(maxId < u.id){
        maxId = u.id;
      }
    })
    tempId = maxId;
    tempId = tempId + 1;
    this.order=new Order(0,0,'',[],[],0,0);
    let r_I=myForm.controls.restId.value
    let o_D=myForm.controls.orderDate.value
    let d_Ids=myForm.controls.dishesIds.value
    let num_Dishes=myForm.controls.numDishes.value
    let u_Id=myForm.controls.userId.value
    let t_O=myForm.controls.totalOrder.value

    this.order.id=tempId;
    this.order.restaurant_id=r_I;
    this.order.order_date=o_D;
    this.order.dishes_ids=d_Ids;
    this.order.num_of_dishes=num_Dishes;
    this.order.user_id=u_Id;
    this.order.total_order=t_O;
    if(tempId!=null && r_I!=null && o_D!=null && d_Ids!=null && num_Dishes!=null && u_Id!=null && t_O!=null){
      this.order=new Order(tempId,r_I,o_D,d_Ids,num_Dishes,u_Id,t_O);
      console.log(this.order);

      this.orderService.addOrder(this.order).subscribe(data=>{
        console.log(data);
      })
    }
    location.reload();
  }








  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  //   restaurant_id: ['', Validators.required],
  //   order_date: ['', Validators.required],
  //   dishes_ids: ['', Validators.required],
  //   num_of_dishes: ['', Validators.required],
  //   user_id: ['', Validators.required],
  //   total_order: ['', Validators.required]
  // });
  // // secondFormGroup = this._formBuilder.group({
  // //   secondCtrl: ['', Validators.required]
  // // });
  
  // isLinear = false;
  // count=0;
  // arrOrders:Order[]=[]
  // //public secondFormGroup: FormGroup;
  // order: Order;
  // countSecondFormSubmit = 0;
  // dishes: Order[]=[];

  // constructor(private _formBuilder: FormBuilder,private orderService:OrderService){
  //   //this.arrUsers=this.userService.getUsers();
  //   this.orderService.getOrders().subscribe(data=>{
  //     this.arrOrders=data
  //   })

  //   // this.secondFormGroup = this._formBuilder.group({
  //   //   form_array_addresses: this._formBuilder.array([this.createDishFormGroup()])
  //   // })

  //   this.order=new Order(0,0,'',[],[],0,0);
  // }

  // // private createDishFormGroup(): FormGroup {
  // //   this.count++;
  // //   return new FormGroup({
  // //     'id': new FormControl('', Validators.required),
  // //     'house_No': new FormControl('', Validators.required),
  // //     'street': new FormControl('', Validators.required),
  // //     'area': new FormControl('', Validators.required),
  // //     'city': new FormControl('', Validators.required),
  // //     'country': new FormControl('', Validators.required),
  // //     'pincode': new FormControl('', Validators.required)
  // //   })
  // // }


  // saveFirstStepData(formdata:FormGroup){
  //   let tempId = 0;
  //   let maxId = 0;
  //   this.arrOrders.forEach(s => {
  //     if (maxId < s.id) {
  //       maxId = s.id;
  //     }
  //   })
  //   tempId = maxId
  //   tempId++
  //   console.log(formdata)
  //   this.order.id=tempId;
  //   this.order.restaurant_id=formdata.value['restaurant_id'];
  //   this.order.order_date=formdata.value['order_date'];
  //   this.order.dishes_ids=formdata.value['dishes_ids'];
  //   this.order.num_of_dishes=formdata.value['num_of_dishes'];
  //   this.order.user_id=formdata.value['user_id'];
  //   this.order.total_order=formdata.value['total_order'];
  //   // this.user.email=formdata.value['email'];
  //   // this.user.password=formdata.value['password'];
  //   // this.user.dob=formdata.value['dob'];
  //   // this.user.mobile=formdata.value['mobile'];
  //   // this.user.role=formdata.value['role'];
  //   console.log(this.order.id);
  //   this.orderService.addOrder(this.order).subscribe(data=>{
  //     console.log(data);
  //   })
  // }

  // saveSecondStepData(formdata: FormGroup){
  //   let tempId = 0;
  //   let maxId = 0;
  //   this.arrUsers.forEach(s => {
  //     if(maxId < s.address.id){
  //       maxId = s.address.id;
  //     }
  //   })
  //   tempId = maxId;
  //   tempId++;
  //   console.log(formdata);
  //   this.user.address.id=tempId;
  //   this.user.address.house_No=formdata.value['house_No'];
  //   this.user.address.street=formdata.value['street'];
  //   this.user.address.area=formdata.value['area'];
  //   this.user.address.city=formdata.value['city'];
  //   this.user.address.country=formdata.value['country'];
  //   this.user.address.pincode=formdata.value['pincode'];
  //   console.log(this.user.address);
  //   //this.userService.addUser(this.user);
  //   this.userService.addUser(this.user).subscribe(data=>{
  //     console.log(data);
  //   })

  // }
}
