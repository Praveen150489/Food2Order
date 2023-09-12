import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-view-details',
  templateUrl: './user-view-details.component.html',
  styleUrls: ['./user-view-details.component.css']
})
export class UserViewDetailsComponent {
  // users:User[]=[]
  // constructor(private userService:UserService){
  //   this.users=this.userService.getUsers()
  // }

  // viewDetails(uid:number){
  //   this.userService.viewDetails(uid);
  // }

  user:User=new User(0,'','','','','','','',new Address(0,'','','','','',''),'');
  constructor(private activatedRoute: ActivatedRoute,private userService:UserService){
    this.activatedRoute.params.subscribe((params: Params) =>{
      let id=params['id'];
      console.log(id);
      //this.user=this.userService.getUserbyId(id);
      this.userService.getUserById(id).subscribe(data=>{
        this.user=data;
      })
      console.log(this.user);
    })
  }
}
