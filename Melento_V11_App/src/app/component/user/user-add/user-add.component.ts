import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';
import { MustMatch } from '../../validators/must-match';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {

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
    this.role=this.myForm.controls['role'];
    
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
      })
      location.reload();
    }
    if(pwd!=confirm_pwd){
      alert("Password and Confirm-Password are not matching");
    }
  }



  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  //   first_name: ['', Validators.required],
  //   middle_name: ['', Validators.required],
  //   last_name: ['', Validators.required],
  //   email: ['', Validators.required],
  //   password: ['', Validators.required],
  //   dob: ['', Validators.required],
  //   mobile: ['', Validators.required],
  //   role: ['', Validators.required]
  // });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  //   house_No: ['', Validators.required],
  //   street: ['', Validators.required],
  //   area: ['', Validators.required],
  //   city: ['', Validators.required],
  //   country: ['', Validators.required],
  //   pincode: ['', Validators.required]
  // });
  
  // isLinear = false;
  // arrUsers: User[]=[];
  // user: User;


  // constructor(private _formBuilder: FormBuilder,private userService:UserService){
  //   //this.arrUsers=this.userService.getUsers();
  //   this.userService.getUser().subscribe(data=>{
  //     this.arrUsers=data
  //   })

  //   this.user=new User(0,'','','','','','','',new Address(0,'','','','','',''),'');
  // }


  // saveFirstStepData(formdata:FormGroup){
  //   let tempId = 0;
  //   let maxId = 0;
  //   this.arrUsers.forEach(s => {
  //     if (maxId < s.id) {
  //       maxId = s.id;
  //     }
  //   })
  //   tempId = maxId
  //   tempId++
  //   console.log(formdata)
  //   this.user.id=tempId;
  //   this.user.first_name=formdata.value['first_name'];
  //   this.user.middle_name=formdata.value['middle_name'];
  //   this.user.last_name=formdata.value['last_name'];
  //   this.user.email=formdata.value['email'];
  //   this.user.password=formdata.value['password'];
  //   this.user.dob=formdata.value['dob'];
  //   this.user.mobile=formdata.value['mobile'];
  //   this.user.role=formdata.value['role'];
  //   console.log(this.user.first_name);
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
