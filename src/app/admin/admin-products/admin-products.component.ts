import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products:any = []; 
  filteredProduct:any =[];

  constructor(private productService: ProductService) { 
    this.productService.getAll().then(products => {
  
      Object.keys(products.val()).forEach(key => {
        this.products.push({
          id: key,
          title: products.val()[key].title,
          price: products.val()[key].price
        })
      });
      this.filteredProduct = this.products;
    })
  }

  filter(query:string) {
    this.filteredProduct = query ? 
    this.products.filter((p:any) => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnInit(): void {
  }

}
