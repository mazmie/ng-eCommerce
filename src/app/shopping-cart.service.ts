import { CartItemMapper } from './mappers/cart-item-mapper';
import { Product } from './models/product';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, PathReference } from 'angularfire2/database';
import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartMapper } from './mappers/shopping-cart-mapper';
import { CartItem } from './models/cart-item';

@Injectable()
export class ShoppingCartService {

    constructor(private db: AngularFireDatabase,
        private cartMapper: ShoppingCartMapper,
        private cartItemMapper: CartItemMapper) {

    }
    save(target) {
        return this.db.list('shopping-carts').push(target);
    }

    async getCart() {
        const cartId = await this.getOrCreateCartId();
        return this.db.object('/shopping-carts/' + cartId)
            .snapshotChanges()
            .map(item => this.cartMapper.toModel(item));
    }

    public async getOrCreateCartId() {
        const key = 'shopping-cart-id';
        if (!localStorage.getItem(key)) {
            const shoppingCart: any = {
                dateCreated: new Date().getTime()
            };
            localStorage.setItem(key, await this.save(shoppingCart).key);
        }
        return localStorage.getItem(key);
    }

    private async getItem(productId: string) {
        const cartId = await this.getOrCreateCartId();
        return this.db
            .object('/shopping-carts/' + cartId + '/items/' + productId)
            .snapshotChanges()
            .map(item => this.cartItemMapper.toModel(item))
            .take(1);
    }

    private async updateItem(item: CartItem) {
        const cartId = await this.getOrCreateCartId();
        return this.db
            .object('/shopping-carts/' + cartId + '/items/' + item.product.id)
            .update(item);
    }

    async removeItems() {
        const cartId = await this.getOrCreateCartId();
        return this.db
            .object('/shopping-carts/' + cartId + '/items')
            .remove();
    }

    private async removeItem(productId: string) {
        const cartId = await this.getOrCreateCartId();
        return this.db
            .object('/shopping-carts/' + cartId + '/items/' + productId)
            .remove();
    }

    public async addToCart(product: Product) {
        (await this.getItem(product.id)).subscribe(item => {
            this.updateItem(new CartItem(product,
                item ? item.quantity + 1 : 1 ));
        });
    }

    public async removeFromCart(product: Product) {
        const cartId = await this.getOrCreateCartId();
        (await this.getItem(product.id)).subscribe(item => {
            if (!item) { return; }
            item.quantity -= 1;
            if (item.quantity === 0) {
                this.removeItem(product.id);
            } else {
                this.updateItem(item);
            }
        });
    }

}
