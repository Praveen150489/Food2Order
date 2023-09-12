import { Address } from "./address"
import { Dish } from "./dish"

export class Restaurant{
    id:number
    r_Name:string
    r_Img_Path:string
    r_Addresses:Address[]
    r_Dishes:Dish[]
    r_Owner_Id:number

    constructor(i:number,r_N:string,r_I:string,r_Add:Address[],r_D:Dish[],r_O_Id:number){
        this.id=i
        this.r_Name=r_N
        this.r_Img_Path=r_I
        this.r_Addresses=r_Add
        this.r_Dishes=r_D
        this.r_Owner_Id=r_O_Id
    }
}