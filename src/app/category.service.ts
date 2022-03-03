import { Injectable } from '@angular/core';
import { child, get, getDatabase, onValue, orderByChild, query, ref } from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories() {
    const dbRef = ref(getDatabase());
    // const topUserPostsRef = query(ref(getDatabase(), '/categories'), orderByChild('name'));
    // onValue(topUserPostsRef, (snapshot) => {
    //   //console.log(snapshot.val())
    // })
    return get(child(dbRef, '/categories'));
  }
}
