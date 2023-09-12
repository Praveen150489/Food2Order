import { CanActivate} from "@angular/router";

export class AdminGuard implements CanActivate{
    //role:any='user'
    role=localStorage.getItem('role')

    canActivate(){
        if(this.role=="admin"){
            return true;
        }
        alert("Sorry... No access")
        return false;
    }
}