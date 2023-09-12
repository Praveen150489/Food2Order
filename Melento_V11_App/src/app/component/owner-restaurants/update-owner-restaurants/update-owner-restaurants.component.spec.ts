import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOwnerRestaurantsComponent } from './update-owner-restaurants.component';

describe('UpdateOwnerRestaurantsComponent', () => {
  let component: UpdateOwnerRestaurantsComponent;
  let fixture: ComponentFixture<UpdateOwnerRestaurantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateOwnerRestaurantsComponent]
    });
    fixture = TestBed.createComponent(UpdateOwnerRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
