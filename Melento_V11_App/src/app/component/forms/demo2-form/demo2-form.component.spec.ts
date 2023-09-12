import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Demo2FormComponent } from './demo2-form.component';

describe('Demo2FormComponent', () => {
  let component: Demo2FormComponent;
  let fixture: ComponentFixture<Demo2FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Demo2FormComponent]
    });
    fixture = TestBed.createComponent(Demo2FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
