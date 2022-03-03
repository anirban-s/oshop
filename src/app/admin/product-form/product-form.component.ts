import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories:any = {};
  product:any = {};
  id:any;

  constructor(
    private categoryService : CategoryService, 
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { 
    this.categoryService.getCategories().then(categories => {
      const data = categories.val();
      Object.keys(data).forEach(key => {
        this.categories[key] = data[key].name;
      });
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).then(product => {
        this.product = product.val();
      })
    }
  }

  ngOnInit(): void {
  }

  save(product: any) {
    if(this.id) {
      this.productService.update(this.id, product)
    } else {
      this.productService.create(product);
    }
    
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(!confirm("Are you sure want to delete this product?")) return;
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
