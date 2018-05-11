import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser;
  cart: ShoppingCart = new ShoppingCart(null, [], new Date());

  constructor(private auth: AuthService,
    private shoppingCartService: ShoppingCartService) {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  async ngOnInit() {
    (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  logout() {
    this.auth.logout();
  }
}
