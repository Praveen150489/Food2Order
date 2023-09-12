// import { Item } from "./item"

export class Cart{
    id:number
    //items:Item[]
    dish_ids:number[]
    number_of_each_dish:number[]
    cart_restaurant_id:number
    total:number

    constructor(i:number,d_ids:number[],num_dishes:number[],c_r_id:number,tot:number){
        this.id=i
        this.dish_ids=d_ids
        this.number_of_each_dish=num_dishes
        this.cart_restaurant_id=c_r_id
        this.total=tot
    }
}