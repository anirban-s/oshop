import { Component, Input, OnInit } from '@angular/core';
import { child, get, getDatabase, onValue, ref } from '@angular/fire/database';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product:any;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: any;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
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
