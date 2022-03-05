import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories: any = [];
  @Input('category') category:any = "";
  
  constructor(categoryService: CategoryService) { 
    categoryService.getCategories().then(categories => {
      Object.keys(categories.val()).map((key:string) => {
        this.categories.push({...categories.val()[key], id: key})
      })
    });
  }

  ngOnInit(): void {
  }

}
