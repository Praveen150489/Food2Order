import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appGreyDish]'
})
export class GreyDishDirective {
  @Input('appGreyDish') greyDish: boolean = false;

  constructor(private el: ElementRef,private renderer: Renderer2) { }

  ngOnChanges() {
    if(this.greyDish) {
      this.renderer.addClass(this.el.nativeElement, 'greyed-out');
    }
    else{
      this.renderer.removeClass(this.el.nativeElement, 'greyed-out');
    }
  }

}
