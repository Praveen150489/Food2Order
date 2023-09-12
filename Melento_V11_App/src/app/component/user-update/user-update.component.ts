import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  user:User=new User(0,"","","","","","","",new Address(0,"","","","","",""),"user");
  usersArr:User[]=[];
  idUpdated:number=0;
  submitted = false;

  myForm: FormGroup;
  firstName: AbstractControl;
  middleName: AbstractControl;
  lastName: AbstractControl;
  email: AbstractControl;
  pwd: AbstractControl;
  //confirm_password: AbstractControl;
  house_No: AbstractControl;
  street: AbstractControl;
  area: AbstractControl;
  city: AbstractControl;
  //state: AbstractControl;
  country: AbstractControl;
  zip: AbstractControl;
  mobile: AbstractControl;
  dob: AbstractControl;
  role: AbstractControl;
  

  


  constructor(fb: FormBuilder,private UserService:UserService) {
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
      'dob': ['',Validators.required],
      'role': ['',Validators.required]
    });
    this.firstName=this.myForm.controls['firstName'];
    this.middleName=this.myForm.controls['middleName'];
    this.lastName=this.myForm.controls['lastName'];
    this.email=this.myForm.controls['email'];
    this.pwd=this.myForm.controls['pwd'];
    //this.confirm_password=this.myForm.controls['confirm-password'];
    this.house_No=this.myForm.controls['house_No'];
    this.street=this.myForm.controls['street'];
    this.area=this.myForm.controls['area'];
    this.city=this.myForm.controls['city'];
    //this.state=this.myForm.controls['state'];
    this.country=this.myForm.controls['country'];
    this.zip=this.myForm.controls['zip'];
    this.mobile=this.myForm.controls['mobile'];
    this.dob=this.myForm.controls['dob'];
    this.role=this.myForm.controls['role'];
    
  }
  ngOnInit(){
    //this.usersArr=this.UserService.getUsers()
    this.UserService.getUser().subscribe(data=>{
      this.usersArr=data
    })
  }
  get f(){return this.myForm.controls}

  onChangeType(evt: any){
    console.log(evt.target.value);
    var idObtained=evt.target.value;
    this.idUpdated=parseInt(idObtained.split(':')[1].trim());

    for(var i=0;i<this.usersArr.length;i++){
      if(this.idUpdated==this.usersArr[i].id){
        this.user=this.usersArr[i];
      }
    }

    this.myForm.get('id')?.setValue(this.user.id.toString())
    this.myForm.get('firstName')?.setValue(this.user.first_name.toString())
    this.myForm.get('middleName')?.setValue(this.user.middle_name.toString())
    this.myForm.get('lastName')?.setValue(this.user.last_name.toString())
    this.myForm.get('email')?.setValue(this.user.email.toString())
    this.myForm.get('pwd')?.setValue(this.user.password.toString())
    this.myForm.get('house_No')?.setValue(this.user.address.house_No.toString())
    this.myForm.get('street')?.setValue(this.user.address.street.toString())
    this.myForm.get('area')?.setValue(this.user.address.area.toString())
    this.myForm.get('city')?.setValue(this.user.address.city.toString())
    this.myForm.get('country')?.setValue(this.user.address.country.toString())
    this.myForm.get('zip')?.setValue(this.user.address.pincode.toString())
    this.myForm.get('mobile')?.setValue(this.user.mobile.toString())
    this.myForm.get('dob')?.setValue(this.user.dob.toString())
    this.myForm.get('role')?.setValue(this.user.role.toString())
  }

  onSubmit(value: any): void {
    this.submitted=true;
    // if(this.myForm.invalid){
    //   return;
    // }
    console.log(this.myForm.controls['firstName'])
    console.log('you submitted value: ', value.firstName,value.middleName,value.lastName,value.email,value.pwd);
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
    this.user=new User(0,"","","","","","","",new Address(0,"","","","","",""),"");
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
    let role=this.myForm.value.role

    this.user.first_name=fN;
    this.user.middle_name=mN;
    this.user.last_name=lN;
    this.user.email=email;
    this.user.password=pwd;
    this.user.dob=dob;
    this.user.mobile=mobile;
    this.user.role=role;
    this.user.address.house_No=house_No
    this.user.address.street=street
    this.user.address.area=area
    this.user.address.city=cty
    this.user.address.country=country
    this.user.address.pincode=zip
    if(fN!=null && mN!=null && lN!=null && email!=null && pwd!=null && dob!=null && mobile!=null && role!=null && house_No!=null && street!=null && area!=null && cty!=null && country!=null && zip!=null){
      this.user=new User(tempId,fN,mN,lN,email,pwd,dob,mobile,new Address(0,house_No,street,area,cty,country,zip),role);
      console.log(this.user);
      //this.UserService.addUser(this.user)
      this.UserService.updateUser(this.user).subscribe(data=>{
        console.log(data);
      })
    }
    location.reload();
  }

}
