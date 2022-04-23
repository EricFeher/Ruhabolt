import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {Cart} from "../../../shared/models/cart";
import {ShoppingItem} from "../../../shared/models/shoppingItem";
import {CartService} from "../../../shared/services/cart.service";
import {MainService} from "../../../shared/services/main.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  items: Array<ShoppingItem>=[];
  @Output() priceEmitter: EventEmitter<number>= new EventEmitter();
  @Output() itemsEmitter: EventEmitter<Array<ShoppingItem>> =new EventEmitter();
  @Output() cartEmitter: EventEmitter<Array<Cart>> =new EventEmitter();
  constructor(private cartService: CartService,
              private mainService: MainService,
              private  router: Router) { }

  ngOnInit(): void {
    console.log("Lefutottam ngOnInit: Loader");
    if(this.items.length===0){
      this.getItems();
    }
  }

  getItems(){
    const user=JSON.parse(localStorage.getItem('user') as string);

    const obs = this.cartService.getCartByUid(user.uid).subscribe( (data:Array<Cart>) => {
        this.items=[];

        for(let item of data){
          this.mainService.getById(item.itemsID).subscribe(data => {
            console.log(data);
            let shoppingItem=data as ShoppingItem;
            const obs= this.mainService.loadShoppingItemImage(data?.imageUrl as string).subscribe(image=>{
              shoppingItem.imageUrl=image as string;
              obs.unsubscribe();
            })
            this.items.push(data as ShoppingItem);
            this.reload();
            this.itemsEmitter.emit(this.items);
          });
        }

        this.cartEmitter.emit(data);
        obs.unsubscribe();

        if(data.length===0){
            this.router.navigateByUrl("/main")
          }
      }
    );

  }

  private reload() {
    let price=-1;
    for (let i = 0; i < (this.items.length as number); i++) {
        price += this.items[i].price;
    }
    price++;
    this.priceEmitter.emit(price);
  }

}
