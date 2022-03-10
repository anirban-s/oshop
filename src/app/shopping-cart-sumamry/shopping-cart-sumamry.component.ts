import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, onValue, ref } from '@angular/fire/database';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-sumamry.component.html',
  styleUrls: ['./shopping-cart-sumamry.component.css']
})
export class ShoppingCartSumamryComponent implements OnInit {
  items: any = [];
  totalItems: number = 0;
  total:number = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    let cartLink = this.shoppingCartService.getCart();
    const db = getDatabase();
    const cartRef = ref(db, cartLink);
    onValue(cartRef, (snapshot) => {
      let cart = snapshot.val();
      this.items = [];
      this.total = 0;
      for(let key in cart.items) {
        this.items.push({
          product: {
            title: cart.items[key].product.title,
            imageUrl: cart.items[key].product.imageUrl,
            price: cart.items[key].product.price,
          },
          quantity: cart.items[key].quantity,
          totalPrice: cart.items[key].product.price * cart.items[key].quantity
        });

        this.totalItems += cart.items[key].quantity;
        this.total += cart.items[key].product.price * cart.items[key].quantity;
      }
    });
  }

}
