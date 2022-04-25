import {Component, Input, OnInit} from '@angular/core';
import {ShoppingItem} from "../../../shared/models/shoppingItem";
import {Router} from "@angular/router";
import {MainService} from "../../../shared/services/main.service";
import {Cart} from "../../../shared/models/cart";
import {CartService} from "../../../shared/services/cart.service";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  items: Array<ShoppingItem> = []

  //TODO: SELECT WHAT YOU WANT TO SEE @INPUT, @OUTPUT

  constructor(
    private router: Router,
    private mainService: MainService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    console.log("boi2");
    this.getAllLimitItems();
  }

  getAllLimitItems(){
    const obs=this.mainService.getAllLimit().subscribe((data: ShoppingItem[]) =>{
      console.log(data);
      this.items=data;
      for(let item of this.items){
        this.mainService.loadShoppingItemImage(item.imageUrl+"").subscribe((data:string) => {
          console.log(data);
          item.imageUrl=data;
        });
      }
      obs.unsubscribe();
    });
  }

  getTypeItems(type: string){
    const obs2=this.mainService.getAll().subscribe();
    const obs=this.mainService.getAllType(type).subscribe((data:ShoppingItem[])=>{
      obs.unsubscribe();
      obs2.unsubscribe();
      this.items=data;
      for(let item of this.items){
        const obs=this.mainService.loadShoppingItemImage(item.imageUrl+"").subscribe((data:string) => {
          obs.unsubscribe();
          console.log(data);
          item.imageUrl=data;
        });
      }
    });
  }

  toCart(item: ShoppingItem) {
    console.log(item.name);
    const user=JSON.parse(localStorage.getItem('user') as string);
    const cart: Cart = {
      id: "",
      uid:user.uid,
      itemsID:item.id
    }
    console.log(user);
    this.cartService.create(cart).then(_=> {
      console.log("Added to cart");
    }).catch(error => {
      console.log(error);
    });
  }
}
