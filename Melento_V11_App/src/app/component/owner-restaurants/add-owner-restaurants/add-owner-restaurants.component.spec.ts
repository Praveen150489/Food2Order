import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOwnerRestaurantsComponent } from './add-owner-restaurants.component';

describe('AddOwnerRestaurantsComponent', () => {
  let component: AddOwnerRestaurantsComponent;
  let fixture: ComponentFixture<AddOwnerRestaurantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOwnerRestaurantsComponent]
    });
    fixture = TestBed.createComponent(AddOwnerRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
