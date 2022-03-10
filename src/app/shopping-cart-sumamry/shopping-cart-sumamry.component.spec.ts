import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartSumamryComponent } from './shopping-cart-sumamry.component';

describe('ShoppingCartSumamryComponent', () => {
  let component: ShoppingCartSumamryComponent;
  let fixture: ComponentFixture<ShoppingCartSumamryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartSumamryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartSumamryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
