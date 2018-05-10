import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Category } from './../models/category';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  categories: Category[] = [];
  products: Product[] = [];
  productList: Product[] = [];
  selectedCategory: String;
  cart: ShoppingCart;
  
  constructor(productService: ProductService,
    categoryService: CategoryService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) {
      productService.listAll().switchMap(items => {
        this.products = this.productList = items;
        return route.queryParamMap;
      }).subscribe(params => {
        this.selectedCategory = params.get('category');
        if (this.selectedCategory) {
          this.filter();
        }
      });

      categoryService.listAll().subscribe(items => {
        this.categories.push({id: 'all', name: 'All Categories' });
        this.categories = this.categories.concat(items);
      });
  }

  filter() {
    if (this.selectedCategory === 'all') {
      this.productList = this.products;
    } else {
      this.productList = this.products.filter(x => x.category === this.selectedCategory);
    }
  }

  async ngOnInit() {
    (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);
  }

}
