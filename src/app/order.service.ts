import { Injectable } from '@angular/core';
import { child, getDatabase, push, ref, update, get } from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  placeOrder(order: any) {
    const db = getDatabase();
    const newOrderKey = push(child(ref(db), '/orders')).key;
    const updates: any = {};
    updates['/orders/' + newOrderKey] = order;

    update(ref(db), updates);
    return newOrderKey;
  }

  getOrders() {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, '/orders'));
  }
}
