export class Address{
    id:number
    house_No:string
    street:string
    area:string
    city:string
    country:string
    pincode:string

    constructor(i:number,h_N:string,str:string,ar:string,ct:string,cntry:string,pn:string){
        this.id=i
        this.house_No=h_N
        this.street=str
        this.area=ar
        this.city=ct
        this.country=cntry
        this.pincode=pn
    }
}