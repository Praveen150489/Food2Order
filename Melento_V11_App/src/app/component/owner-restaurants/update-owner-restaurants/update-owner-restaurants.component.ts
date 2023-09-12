import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { Dish } from 'src/app/models/dish';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/restaurant.service';

@Component({
  selector: 'app-update-owner-restaurants',
  templateUrl: './update-owner-restaurants.component.html',
  styleUrls: ['./update-owner-restaurants.component.css']
})
export class UpdateOwnerRestaurantsComponent {
  firstFormGroup = this._formBuilder.group({
    r_Name: ['', Validators.required],
    r_Img_Path: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup=this._formBuilder.group({
    thirdCtrl:['', Validators.required],
  });

  isLinear = false;
  selectedRestaurant = false;
  countAddress=0;
  countdish=0;
  arrRestaurants:Restaurant[]=[];
  selectedArrRestaurants:Restaurant[]=[];
  public addressForm: FormGroup;
  public dishForm: FormGroup;
  restaurant:Restaurant;
  countSecondFormSubmit=0;
  countThirdFormSubmit=0;
  addresses:Address[]=[];
  dishes:Dish[]=[];
  idUpdated: number=0;

  constructor(private _formBuilder: FormBuilder,private restaurantService:RestaurantService) {
    // this.arrRestaurants=this.restaurantService.getRestaurants();
    this.restaurantService.getRestaurants().subscribe(data=>{
      this.arrRestaurants=data;
      let str=localStorage.getItem('user_id');
      let user_id=0;
      if(str && str!=null){
        user_id=parseInt(str);
      }
      for(let i=0;i<this.arrRestaurants.length;i++){
        if(this.arrRestaurants[i].r_Owner_Id == user_id){
          this.selectedArrRestaurants.push(this.arrRestaurants[i]);
        }
      }
    })
    
    this.addressForm=this._formBuilder.group({
      form_array_addresses:this._formBuilder.array([this.createAddressFormGroup()])
      
    })
    this.dishForm=this._formBuilder.group({
      form_array_dishes:this._formBuilder.array([this.createDishFormGroup()])
      
    })
    this.restaurant=new Restaurant(0,'','',[],[],0);
    
  }

  onChangeType(evt:any){
    console.log(evt.target.value);
    var idobtained=evt.target.value;
    this.idUpdated=parseInt(idobtained.split(':')[1].trim());
    for (var i = 0; i<this.arrRestaurants.length; i++) {
      if(this.idUpdated==this.arrRestaurants[i].id){
        this.restaurant=this.arrRestaurants[i];
        this.selectedRestaurant = true;
      }
    }
    console.log(this.restaurant);
    this.firstFormGroup.get('r_Name')?.setValue(this.restaurant.r_Name);
    this.firstFormGroup.get('r_Img_Path')?.setValue(this.restaurant.r_Img_Path);

    let suppSecondFormArray = this.addressForm.get('form_array_addresses') as FormArray
    console.log(suppSecondFormArray);
    suppSecondFormArray.clear
    
    suppSecondFormArray = this._formBuilder.array(this.restaurant.r_Addresses.map(r => this._formBuilder.group(r)))

    this.addressForm = this._formBuilder.group({
      form_array_addresses: this._formBuilder.array(this.restaurant.r_Addresses.map(r => this._formBuilder.group(r)))
    });
    console.log(this.addressForm);
    let thirdFormArray = this.dishForm.get("form_array_dishes") as FormArray
    thirdFormArray.clear

    thirdFormArray = this._formBuilder.array(this.restaurant.r_Dishes.map(r => this._formBuilder.group(r)))
    this.dishForm = this._formBuilder.group({
     form_array_dishes: this._formBuilder.array(this.restaurant.r_Dishes.map(r => this._formBuilder.group(r)))
    });


    
  }
  private createAddressFormGroup(): FormGroup {
    
    this.countAddress++
    return new FormGroup({
      'id': new FormControl('', Validators.required),
      'house_No': new FormControl('', Validators.required),
      'street': new FormControl('', Validators.required),
      'area': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'pincode': new FormControl('', Validators.required)
    })
  }
  private createDishFormGroup():FormGroup{
    this.countdish++;
    return new FormGroup({
      'id': new FormControl('', Validators.required),
      // 'rest_id': new FormControl('', Validators.required),
      'd_Name': new FormControl('', Validators.required),
      'd_Cost': new FormControl('', Validators.required),
      'd_Description': new FormControl('', Validators.required),
      'd_Category': new FormControl('', Validators.required),
      'd_Composition': new FormControl('',Validators.required),
      'd_Type': new FormControl('', Validators.required),
      'available': new FormControl('', Validators.required)
    })

  }

  saveFirstStepData(formdata:FormGroup){
    this.restaurant.r_Name=formdata.value['r_Name'];
    this.restaurant.r_Img_Path=formdata.value['r_Img_Path'];
  }

  saveSecondStepData(formdata: FormGroup){
    this.countSecondFormSubmit++;
    if (this.countSecondFormSubmit == this.countAddress) {
      // this.addresses=Object.values(formdata);
      // console.log(formdata);
      let adressArr = Object.values(formdata);
      let count = 1;
      adressArr.forEach((a) => {        
       
      });
      this.addresses = adressArr;
      let temp = JSON.parse(JSON.stringify(this.addresses));
      this.restaurant.r_Addresses = temp[0];
      this.restaurant.r_Addresses.forEach((a,i)=>{
        a.id=i+1
      })
      console.log(this.restaurant.r_Addresses);
    }
    console.log(this.restaurant);
    
  }

  saveThirdStepData(formdata: FormGroup){
    this.countThirdFormSubmit++;
    if (this.countThirdFormSubmit == this.countdish) {
      // this.addresses=Object.values(formdata);
      // console.log(formdata);
      let dishArr = Object.values(formdata);
      let count = 1;
      dishArr.forEach((d) => {        
       
      });
      this.dishes = dishArr;
      let temp = JSON.parse(JSON.stringify(this.dishes));
      this.restaurant.r_Dishes = temp[0];
      this.restaurant.r_Dishes.forEach((d,i)=>{
        d.id=i+1
        let str=d.d_Cost.toString();
        if(str && str!=""){
          let cost=parseInt(str);
          d.d_Cost=cost;
        }
      })
      console.log(this.restaurant.r_Dishes);
      //  this.restaurantService.addRestaurant(this.restaurant)
      //alert("Supplier added Succesfully")
      this.restaurantService.updateRestaurant(this.restaurant).subscribe(data=>{
        console.log(data);
      })
      
      alert("Restaurant Updated Succesfully")

    }
    console.log(this.restaurant);
    
  }

  form_array_addresses(): FormArray {
    return this.addressForm.get("form_array_addresses") as FormArray;
  }
  form_array_dishes():FormArray {
    
    return this.dishForm.get("form_array_dishes") as FormArray;
  }
  public removeOrClearAddress(i:number){
    const form_array_addresses = this.addressForm.get('form_array_addresses') as FormArray
    if (form_array_addresses.length > 1) {
      form_array_addresses.removeAt(i)
    }
    else {
      form_array_addresses.reset()
    }
  }
  public removeOrClearDish(i:number){
    const form_array_dishes = this.dishForm.get('form_array_dishes') as FormArray
    if (form_array_dishes.length > 1) {
      form_array_dishes.removeAt(i)
    }
    else {
      form_array_dishes.reset()
    }
  }
  public addAddressFormGroup(){
    const form_array_addresses = this.addressForm.get('form_array_addresses') as FormArray
    form_array_addresses.push(this.createAddressFormGroup())
  }
  
  public addDishFormGroup(){
    const form_array_dishes = this.dishForm.get('form_array_dishes') as FormArray
    form_array_dishes.push(this.createDishFormGroup())
  }

}
