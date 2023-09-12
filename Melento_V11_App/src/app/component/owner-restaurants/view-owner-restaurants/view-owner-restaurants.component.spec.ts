import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwnerRestaurantsComponent } from './view-owner-restaurants.component';

describe('ViewOwnerRestaurantsComponent', () => {
  let component: ViewOwnerRestaurantsComponent;
  let fixture: ComponentFixture<ViewOwnerRestaurantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOwnerRestaurantsComponent]
    });
    fixture = TestBed.createComponent(ViewOwnerRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
