import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  name: string
  emailAddress: string
  mobile: number
  whatsapp: number
  query: string

  constructor(){
    this.name="";
    this.emailAddress="";
    this.mobile=0;
    this.whatsapp=0;
    this.query="";
  }

  onSubmit(value: string): void{
    if(this.name=="" || this.emailAddress=="" || this.query==""){
      alert("Name, email and query can't be empty.");
    }
  }
}
