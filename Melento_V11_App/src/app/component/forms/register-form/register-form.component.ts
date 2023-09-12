import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';
import { MustMatch } from '../../validators/must-match';
import { Cart } from 'src/app/models/card';
import { CardService } from 'src/app/card.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent {

  user:User=new User(0,"","","","","","","",new Address(0,"","","","","",""),"user");
  usersArr:User[]=[];
  submitted = false;
  myForm: FormGroup;
  firstName: AbstractControl;
  middleName: AbstractControl;
  lastName: AbstractControl;
  email: AbstractControl;
  pwd: AbstractControl;
  confirm_password: AbstractControl;
  house_No: AbstractControl;
  street: AbstractControl;
  area: AbstractControl;
  city: AbstractControl;
  state: AbstractControl;
  country: AbstractControl;
  zip: AbstractControl;
  mobile: AbstractControl;
  dob: AbstractControl;
  

  
  constructor(fb: FormBuilder,private UserService:UserService,private cartService:CardService) {
    //this.usersArr=this.UserService.getUsers()
    this.UserService.getUser().subscribe(data=>{
      this.usersArr=data
    })
    this.myForm = fb.group({
      'firstName': ['',Validators.required],
      'middleName': ['',Validators.required],
      'lastName': ['',Validators.required],
      'email': ['',Validators.required],
      'pwd': ['',Validators.required],
      'confirm_password': ['',Validators.required],
      'house_No': ['',Validators.required],
      'street': ['',Validators.required],
      'area': ['',Validators.required],
      'city': ['',Validators.required],
      'state': ['',Validators.required],
      'country': ['',Validators.required],
      'zip': ['',Validators.required],
      'mobile': ['',Validators.required],
      'dob': ['',Validators.required]
    },
    {
      validator: MustMatch()   // 'pwd','confirm_password'
    });
    
    this.firstName=this.myForm.controls['firstName'];
    this.middleName=this.myForm.controls['middleName'];
    this.lastName=this.myForm.controls['lastName'];
    this.email=this.myForm.controls['email'];
    this.pwd=this.myForm.controls['pwd'];
    this.confirm_password=this.myForm.controls['confirm_password'];
    this.house_No=this.myForm.controls['house_No'];
    this.street=this.myForm.controls['street'];
    this.area=this.myForm.controls['area'];
    this.city=this.myForm.controls['city'];
    this.state=this.myForm.controls['state'];
    this.country=this.myForm.controls['country'];
    this.zip=this.myForm.controls['zip'];
    this.mobile=this.myForm.controls['mobile'];
    this.dob=this.myForm.controls['dob'];
    
  }
  ngOnInit(){
    //this.usersArr=this.UserService.getUsers()
    this.UserService.getUser().subscribe(data=>{
      this.usersArr=data
    })
  }
  get f(){return this.myForm.controls}

  onSubmit(value: any): void {
    this.submitted=true;
    if(this.myForm.invalid){
      return;
    }
    console.log(this.myForm.controls['firstName'])
    console.log('you submitted value: ', value.firstName,value.middleName,value.lastName,value.email,value.pwd);
    var tempId=0;
    var maxId=0;
    this.usersArr.forEach(u =>{
      if(maxId < u.id){
        maxId = u.id;
      }
    })
    tempId = maxId;
    tempId = tempId + 1;
    this.user=new User(0,"","","","","","","",new Address(0,"","","","","",""),"user");
    let fN=this.myForm.value.firstName
    let mN=this.myForm.value.middleName
    let lN=this.myForm.value.lastName
    let email=this.myForm.value.email
    let pwd=this.myForm.value.pwd
    let confirm_pwd=this.myForm.value.confirm_password
    let house_No=this.myForm.value.house_No
    let street=this.myForm.value.street
    let area=this.myForm.value.area
    let cty=this.myForm.value.city
    let state=this.myForm.value.state
    let country=this.myForm.value.country
    let zip=this.myForm.value.zip
    let dob=this.myForm.value.dob
    let mobile=this.myForm.value.mobile
    let role="user"

    this.user.first_name=fN;
    this.user.middle_name=mN;
    this.user.last_name=lN;
    this.user.email=email;
    this.user.password=pwd;
    this.user.dob=dob;
    this.user.mobile=mobile;
    this.user.role=role;
    this.user.address.house_No=house_No;
    this.user.address.street=street;
    this.user.address.area=area;
    this.user.address.city=cty;
    this.user.address.country=country;
    this.user.address.pincode=zip;
    if(fN!=null && mN!=null && lN!=null && email!=null && pwd!=null && pwd==confirm_pwd && dob!=null && mobile!=null && role!=null && house_No!=null && street!=null && area!=null && cty!=null && country!=null && zip!=null){
      this.user=new User(tempId,fN,mN,lN,email,pwd,dob,mobile,new Address(0,house_No,street,area,cty,country,zip),role);
      console.log(this.user);
      this.UserService.addUser(this.user).subscribe(data=>{
        console.log(data);
        console.log(data['insertedId']);
        let uid=data['insertedId'];
        let c=new Cart(uid,[],[],0,0);
        this.cartService.addCart(c).subscribe(d=>{
          console.log("New cart created");
          console.log(d);
          location.reload();
        })
      })
    }
    if(pwd!=confirm_pwd){
      alert("Password and Confirm-Password are not matching");
    }
  }

}
