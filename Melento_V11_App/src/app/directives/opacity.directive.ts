import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOpacity]'
})
export class OpacityDirective {

  constructor(private el: ElementRef) {
    //this.el.nativeElement.style.opacity = 0.9;
  }

  //@Input() defaultColor: number=0;

  //@Input('appOpacity') opacityColor: number=0;
  @HostListener('dragstart') onDragStart() {
    this.changeOpacity(0.0);
  }

  @HostListener('dragend') onDragLeave() {
    this.changeOpacity(0.1);
  }
  private changeOpacity(opValue: number) {
    this.el.nativeElement.style.opacity = opValue;
  }

  //constructor() { }

}
