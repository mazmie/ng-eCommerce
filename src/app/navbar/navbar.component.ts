import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  appUser: AppUser;
  cart: ShoppingCart = new ShoppingCart(null, [], new Date());

  cartSubscription: Subscription;

  constructor(private auth: AuthService,
    private shoppingCartService: ShoppingCartService) {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  async ngOnInit() {
    this.cartSubscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }
}
