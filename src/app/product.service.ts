import { Injectable } from '@angular/core';
import { child, getDatabase, push, ref, update, get, set, remove } from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  create(product: any) {
    const db = getDatabase();
    const newProductKey = push(child(ref(db), '/products')).key;
    const updates: any = {};
    updates['/products/' + newProductKey] = product;

    return update(ref(db), updates);
  }

  getAll() {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, '/products'));
  }

  get(productId:string) {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, '/products/' + productId));
  }

  update(productId:any, product:any) {
    const db = getDatabase();
    return set(ref(db, '/products/' + productId), product);
  }

  delete(productId:string) {
    const db = getDatabase();
    return remove(ref(db, '/products/' + productId));
  }
}
