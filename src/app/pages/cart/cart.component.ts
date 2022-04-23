import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Cart} from "../../shared/models/cart";
import {ShoppingItem} from "../../shared/models/shoppingItem";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: Array<ShoppingItem>=[];
  cart: Array<Cart>=[];
  price: number=0;

  constructor() { }

  ngOnInit(): void {
    console.log("Lefutottam ngOnInit: Cart");
  }

  getPrice(price:number) {
    this.price=price;
  }

  getItems(items: Array<ShoppingItem>) {
    this.items=items;
  }

  getCart(cart: Array<Cart>) {
    this.cart=cart;
  }
}
