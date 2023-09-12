export class Dish{
    id:number
    //rest_id:number
    d_Name:string
    d_Cost:number
    d_Description:string
    d_Category:string
    d_Composition:string
    d_Type:string
    available: string

    constructor(i:number,d_N:string,d_C:number,d_D:string,d_Cat:string,d_Com:string,d_T:string,ava:string){
        this.id=i
       // this.rest_id=r_id
        this.d_Name=d_N
        this.d_Cost=d_C
        this.d_Description=d_D
        this.d_Category=d_Cat
        this.d_Composition=d_Com
        this.d_Type=d_T
        this.available=ava
    }
}