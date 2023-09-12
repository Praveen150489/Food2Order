export class Order{
    id:number
    restaurant_id:number
    order_date:string
    dishes_ids:number[]
    num_of_dishes:number[]
    user_id:number
    total_order:number

    constructor(i:number,res_id:number,ord_dt:string,dshes_ids:number[],num_dishes:number[],u_id:number,ord_tot:number){
        this.id=i
        this.restaurant_id=res_id
        this.order_date=ord_dt
        this.dishes_ids=dshes_ids
        this.num_of_dishes=num_dishes
        this.user_id=u_id
        this.total_order=ord_tot
    }
}