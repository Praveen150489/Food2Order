import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {
  //@Input() users:User[]=[]
  users:User[]=[]
  constructor(private userService:UserService,private router:Router){
    //this.users=this.userService.getUsers()
    this.userService.getUser().subscribe(data=>{
      this.users=data
    })
  }

  // deleteUser(uid:number){
  //   this.userService.deleteUser(uid);
  // }
  deleteUser(uid:number){
    this.userService.deleteUser(uid).subscribe(data=>{
      console.log(data);
    })
    location.reload();
  }



  viewDetails(uid:number){
    //this.userService.viewDetails(uid);
    this.router.navigate(['users/'+uid])
  }
}
