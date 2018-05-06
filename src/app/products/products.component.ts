import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Category } from './../models/category';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  categories: Category[] = [];
  products: Product[] = [];
  productList: Product[] = [];

  constructor(productService: ProductService,
    categoryService: CategoryService,
    private route: ActivatedRoute) {
      productService.listAll().switchMap(items => {
        this.products = this.productList = items;
        return route.queryParamMap;
      }).subscribe(params => {
        const category = params.get('category');
        if (category) {
          this.filter(category);
        }
      });

      categoryService.listAll().subscribe(items => {
        this.categories.push({id: 'all', name: 'All Categories' });
        this.categories = this.categories.concat(items);
      });
  }

  filter(category: string) {
    if (category === 'all') {
      this.productList = this.products;
    } else {
      this.productList = this.products.filter(x => x.category === category);
    }
  }

  ngOnInit() {
  }

}
