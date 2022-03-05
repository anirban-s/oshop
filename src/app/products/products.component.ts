import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  filteredProducts:any = [];
  
  category:any = "";

  constructor(
    route: ActivatedRoute,
    productService: ProductService, 
    caregoryService: CategoryService) {
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

  ngOnInit(): void {
  }

}
