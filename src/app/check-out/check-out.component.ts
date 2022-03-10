import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, ref } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit { 
  shipping: any = {}; 
  items:any;
  userId:any;

  constructor(
    private router:Router,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService) {}
  
  placeOrder() {
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.items
    }

    let result = this.orderService.placeOrder(order);
    this.shoppingCartService.clearCart();
    this.router.navigate(['/order-success', result]);
  }   
  
  ngOnInit() {
    let cartLink = this.shoppingCartService.getCart();
    const db = getDatabase();
    const cartRef = ref(db, cartLink);
    onValue(cartRef, (snapshot) => {
      let cart = snapshot.val();
      this.items = [];
      for(let key in cart.items) {
        this.items.push({
          product: {
            title: cart.items[key].product.title,
            imageUrl: cart.items[key].product.imageUrl,
            price: cart.items[key].product.price,
          },
          quanity: cart.items[key].quantity,
          totalPrice: cart.items[key].product.price * cart.items[key].quantity
        })
      }
    });

    this.authService.user$.subscribe(user => this.userId = user.uid)
  }
}
