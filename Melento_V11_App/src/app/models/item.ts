export class Item{
    id:number
    rest_id:number
    dish_ids:number[]
    number_of_each_dish:number[]
    constructor(i:number,r_id:number,d_ids:number[],num_dishes:number[]){
        this.id=i
        this.rest_id=r_id
        this.dish_ids=d_ids
        this.number_of_each_dish=num_dishes
    }
}