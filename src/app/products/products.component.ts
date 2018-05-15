import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Category } from './../models/category';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  products: Product[] = [];
  productList: Product[] = [];
  selectedCategory: String;
  cart: ShoppingCart;
  
  cartSubscription: Subscription;
  productsSubscription: Subscription;
  categorySubscription: Subscription;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) {
  }

  filter() {
    if (!this.selectedCategory) { return; }
    if (this.selectedCategory === 'all') {
      this.productList = this.products;
    } else {
      this.productList = this.products.filter(x => x.category === this.selectedCategory);
    }
  }

  async ngOnInit() {
    this.cartSubscription = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);

    this.productsSubscription = this.productService.listAll().switchMap(items => {
      this.products = this.productList = items;
      return this.route.queryParamMap;
    }).subscribe(params => {
      this.selectedCategory = params.get('category');
      this.filter();      
    });

    this.categorySubscription = this.categoryService.listAll().subscribe(items => {
      this.categories.push({ id: 'all', name: 'All Categories' });
      this.categories = this.categories.concat(items);
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
    this.categorySubscription.unsubscribe();
  }
}
