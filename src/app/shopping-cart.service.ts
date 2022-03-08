import { Injectable } from '@angular/core';
import { child, getDatabase, push, ref, update, get, set, remove } from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }

  getCart() {
    let cartId = this.getOrCreateCartId();
    const cart = '/shopping-carts/' + cartId;
    return cart;
  }

  async addToCart(product: any) {
    let cartId = this.getOrCreateCartId();
    const db = ref(getDatabase());

    let item = await get(child(db, this.getItem(cartId, product.id)));

    if(item.exists()){
      const updates: any = {};
      updates[this.getItem(cartId, product.id)] = {product: product, quantity: item.val().quantity + 1 };
      update(ref(getDatabase()), updates);
    }
    else {
      set(ref(getDatabase(), this.getItem(cartId, product.id)), {product: product, quantity: 1})
    }
  }

  async removeFromCart(product: any) {
    let cartId = this.getOrCreateCartId();
    const db = ref(getDatabase());

    let item = await get(child(db, this.getItem(cartId, product.id)));

    if(item.exists()){
      const updates: any = {};
      let quantity = item.val().quantity - 1;
      if(quantity === 0) {
        updates[this.getItem(cartId, product.id)] = null;
      } else {
        updates[this.getItem(cartId, product.id)] = {product: product, quantity: quantity };
      }
      update(ref(getDatabase()), updates);
    }
    else {
      set(ref(getDatabase(), this.getItem(cartId, product.id)), {product: product, quantity: 0})
    }
  }

  clearCart() {
    let cartId = this.getOrCreateCartId();
    const db = getDatabase();
    return remove(ref(db, '/shopping-carts/' + cartId +'/items'));
  }



  private create() {
    const db = getDatabase();
    const newCartKey = push(child(ref(db), '/shopping-carts')).key;
    const updates: any = {};
    updates['/shopping-carts/' + newCartKey] = { dateCreated: new Date().getTime() };

    update(ref(db), updates);
    return newCartKey;
  }

  

  private getItem(cartId:string, productId: string) {
    return '/shopping-carts/' + cartId + '/items/' + productId;
  }

  private getOrCreateCartId() {
    let cartId = localStorage.getItem("cartId");
    if(!cartId) {
      let result = this.create() as string;
      localStorage.setItem("cartId", result);
      return result;
    } 

    return cartId;
  }

 
}
