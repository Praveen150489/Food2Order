import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  template: '<div><single-component (putRightOnIt)="dishAppreciated($event)"></single-component></div>',
  styleUrls: ['./output.component.css']
})
export class OutputComponent {
  isBordered: boolean=false;
  // constructor(){
  //   // let ee = new EventEmitter()
  //   // ee.subscribe(data => {
  //   //   console.log("Hello" + data);
  //   // })
  //   // ee.emit("Jonney Jonney");
  // }

  color: string="";
  fontSize: number=0;

  style: {
    'background-color': string,
    'border-radius': string,
    border?: string,
    width?: string,
    height?: string
  } = {
    'background-color': '#ccc',
    'border-radius': '50px',
    'height': '30px',
    'width': '30px'
  }

  choice: number=0;

  classesObj={
    bordered: false
  };
  classList: string[]=[]

  constructor(){

  }

  ngOnInit(){
    this.choice=1;
    this.color='blue';
    this.fontSize=16;
    this.isBordered = true;
    this.classList = ['blue','round'];
    this.toggleBorder();

  }
  toggleBorder(){
    this.isBordered = !this.isBordered;

    this.classesObj = {
      bordered: this.isBordered
    };
  }
  toggleClass(cssClass: string): void{
    const pos: number = this.classList.indexOf(cssClass);
    if(pos > -1){
      this.classList.splice(pos,1);
    }
    else{
      this.classList.push(cssClass);
    }
  }




  
  apply(color: string, fontSize: string): void{
    this.color=color;
    this.fontSize=parseInt(fontSize);
  }

  nextChoice():void{
    this.choice += 1;
    if(this.choice > 5){
      this.choice=1;
    }
  }

  dishAppreciated(evt:any){
    console.log("Hurrah... Another dish was appreciated: "+evt);
  }


}

@Component({
  selector: 'single-component',
  template: '<div>Single Component Here...<button class="btn btn-secondary" (click)="liked()">Appreciate the dish!!!</button></div>',
  styleUrls: ['./output.component.css']
})
export class SingleComponent{
  @Output() putRightOnIt:EventEmitter<string>

  constructor(){
    this.putRightOnIt = new EventEmitter<string>
  }

  liked(){
    this.putRightOnIt.emit("oh oh oh");
  }
}


