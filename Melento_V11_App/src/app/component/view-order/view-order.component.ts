import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/order.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent {
  orders:Order[]=[];
  constructor(private orderService:OrderService,private router:Router,private filerSaver:FileSaverService){
    this.orderService.getOrders().subscribe(data=>{
      this.orders=data
    })
  }

  excelExport(){

    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    // custome code
    const worksheet = XLSX.utils.json_to_sheet(this.orders)

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames: ['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook,{bookType:'xlsx',type:'array'});

    const blobData = new Blob([excelBuffer],{type:EXCEL_TYPE});

    this.filerSaver.save(blobData,"demoFile")
  }
}
