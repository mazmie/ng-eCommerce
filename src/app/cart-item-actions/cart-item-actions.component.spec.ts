import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemActionsComponent } from './cart-item-actions.component';

describe('CartItemActionsComponent', () => {
  let component: CartItemActionsComponent;
  let fixture: ComponentFixture<CartItemActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartItemActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
