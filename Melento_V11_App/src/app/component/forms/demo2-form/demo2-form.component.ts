import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User_Jwt } from 'src/app/models/user_jwt';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-demo2-form',
  templateUrl: './demo2-form.component.html',
  styleUrls: ['./demo2-form.component.css']
})
export class Demo2FormComponent{
  user:string = "";
  constructor(private userService:UserService){

  }
  registerUser_Jwt(user:string,pwd:string){
    let u=new User_Jwt(user,pwd)
    this.userService.registerUser(u).subscribe(data => {
      console.log(data);
    })
  }

  loginUser_Jwt(user:string,pwd:string){
    let u=new User_Jwt(user,pwd)
    let msg=this.userService.loginUser(u)
    console.log(msg);
  }

}
