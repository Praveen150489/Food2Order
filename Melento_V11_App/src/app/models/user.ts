import { Address } from "./address"

export class User{
    id:number
    first_name:string
    middle_name:string
    last_name:string
    email:string
    password:string
    dob:string
    mobile:string
    address:Address
    role:string

    constructor(i:number,fName:string,mName:string,lName:string,mail:string,pwd:string,birth_date:string,phone:string,add:Address,rol:string){
        this.id=i
        this.first_name=fName
        this.middle_name=mName
        this.last_name=lName
        this.email=mail
        this.password=pwd
        this.dob=birth_date
        this.mobile=phone
        this.address=add
        this.role=rol
    }
}