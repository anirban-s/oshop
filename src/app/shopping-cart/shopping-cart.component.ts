import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, ref } from '@angular/fire/database';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: any;
  shoppingCartItemCount:number = 0;
  productIds: any[] = [];
  totalPrice: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    let cartLink = this.shoppingCartService.getCart();
    const db = getDatabase();
    const cartRef = ref(db, cartLink);
    onValue(cartRef, (snapshot) => {
      this.cart = {};
      this.cart = snapshot.val();
      this.productIds = [];
      this.totalPrice = 0;
      this.shoppingCartItemCount = 0;
      for (let productId in this.cart.items) {
        this.shoppingCartItemCount += this.cart.items[productId].quantity;
        this.productIds.push(productId);
        this.totalPrice += this.cart.items[productId].quantity * this.cart.items[productId].product.price;
      }
    });
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

}
