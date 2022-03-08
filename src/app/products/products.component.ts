import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { child, get, getDatabase, onValue, ref } from '@angular/fire/database';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  filteredProducts:any = [];
  cart:any;
  category:any = "";

  constructor(
    route: ActivatedRoute,
    productService: ProductService, 
    private shoppingCartService: ShoppingCartService
    ) {
    productService.getAll().then(products => {
      Object.keys(products.val()).map((key:any) => {
        this.products.push({...products.val()[key], id: key})
      })
    });
    
    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ? this.products.filter((p:any) => p.category === this.category) : this.products;
    })
   }

  ngOnInit() {
    let cartRef = this.shoppingCartService.getCart();
    const db = getDatabase();
    const starCountRef = ref(db, cartRef);
    onValue(starCountRef, (snapshot) => {
      this.cart = snapshot.val();
    });
  }

}
