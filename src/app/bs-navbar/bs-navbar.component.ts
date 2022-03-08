import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, ref } from '@angular/fire/database';
// import { Auth, authState, signOut, User } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: any;
  shoppingCartItemCount: number = 0;

  constructor(public authService: AuthService, private cartService: ShoppingCartService) {
    this.authService.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    })
     
   }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    let cartRef = this.cartService.getCart();
    const db = getDatabase();
    const starCountRef = ref(db, cartRef);
    onValue(starCountRef, (snapshot) => {
      let cart = snapshot.val();
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });
  }

}
