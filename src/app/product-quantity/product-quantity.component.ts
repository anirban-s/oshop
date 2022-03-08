import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product:any;
  @Input('shopping-cart') shoppingCart: any;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    if(this.shoppingCart.items) {
      let item = this.shoppingCart.items[this.product.id];
      return item ? item.quantity : 0;
    }
    
    return 0;
  }

}
