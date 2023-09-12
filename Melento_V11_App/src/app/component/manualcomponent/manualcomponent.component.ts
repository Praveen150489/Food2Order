import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-manual',
    templateUrl: './manualcomponent.component.html',
    //template:"<b>This is the banner template i.e View</b>",
    styleUrls: ['./manualcomponent.component.css']
})

export class ManualComponent implements OnInit{
    constructor(){
        console.log("constructor called")
    }
    ngOnInit(): void {
        console.log("Manual Component was initialised")
    }
}