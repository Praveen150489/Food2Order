import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from 'src/app/card.service';
import { Address } from 'src/app/models/address';
import { Cart } from 'src/app/models/card';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.css']
})
export class DemoFormComponent {
  emailAddress:string
  pwd:string
  user_id:number
  users:User[]=[]
  
  constructor(private userService:UserService,private router:Router,private cartService:CardService){
    this.emailAddress=""
    this.pwd=""
    this.user_id=0
    //this.users=this.userService.getUsers()
    this.userService.getUser().subscribe(data=>{
      this.users=data
    })
  }

  onSubmit(value: string): void{

    let flag=false;
    let id=0;
    for(let i=0;i<this.users.length;i++){
      if(this.emailAddress==this.users[i].email && this.pwd==this.users[i].password){
        localStorage.setItem("email",this.users[i].email);
        localStorage.setItem("role",this.users[i].role);
        localStorage.setItem("user_id",this.users[i].id.toString());
        location.reload()
        alert("Login Successfully");
        flag=true;
        break;
      }
    }

    if(flag==false){
      alert("Wrong Email id or password");
      location.reload()
    }

  }

}
