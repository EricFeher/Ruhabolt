import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {OrderService} from "../../../shared/services/order.service";
import {CartService} from "../../../shared/services/cart.service";
import {Cart} from "../../../shared/models/cart";
import {Order} from "../../../shared/models/order";
import {MainService} from "../../../shared/services/main.service";
import {ShoppingItem} from "../../../shared/models/shoppingItem";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../../shared/models/user";

@Component({
  selector: 'app-sidecard',
  templateUrl: './sidecard.component.html',
  styleUrls: ['./sidecard.component.scss']
})


export class SidecardComponent implements OnInit, OnDestroy {
  @Input() priceInput?: number;
  @Input() cartInput?: Array<Cart>;
  user: User;

  constructor(
    private location: Location,
    private orderService: OrderService,
    private cartService: CartService,
    private mainService: MainService,
    private router: Router) {

    this.user = JSON.parse(localStorage.getItem('user') as string);
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    console.log("ngOnDestroy lefutott");
  }

  onSubmit() {
    console.log(`- [CART] Submitting order! -`)
    console.log(this.cartInput);

    const localCart: Array<string> = [];
    this.cartInput?.forEach((item: Cart) => {
      localCart.push(item.itemsID);

    });

    this.cartInput?.forEach((item:Cart)=>{
      this.cartService.deleteFromCart(item);
      this.mainService.decreaseItemByOne(item);
    });

    // Reduce all items in storage


    // Create Order
    let order: Order = {
      id: "",
      uid: this.user.uid,
      itemsID: localCart,
      price: this.priceInput as number,
      dateOfOrder: new Date().getTime()
    };

    this.orderService.create(order)
      .then(data => {
        console.log("It's Fine");
      })
      .catch(err =>
        console.error(err)
      );
    this.router.navigateByUrl("/main");
    }

    goBack() {
      this.location.back();
    }
}
