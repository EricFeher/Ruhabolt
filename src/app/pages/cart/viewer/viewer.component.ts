import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ShoppingItem} from "../../../shared/models/shoppingItem";
import {CartService} from "../../../shared/services/cart.service";
import {Cart} from "../../../shared/models/cart";
import {Router} from "@angular/router";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit{
  @Input() itemsInput?: Array<ShoppingItem>;
  @Input() cartInput?: Array<Cart>;
  @Output() deleteClicked: EventEmitter<any>= new EventEmitter();

  constructor(private cartService:CartService,
              private router: Router
  ) { }

  ngOnInit(): void {
    console.log("Lefutottam ngOnInit: Viewer");
  }

  deleteFromCart(item: ShoppingItem) {
    if(this.cartInput!=undefined && this.itemsInput!=undefined){
      for(let i=0;i<this.cartInput.length;i++){
        if(this.cartInput[i].itemsID==item.id){
          this.cartService.delete(this.cartInput[i].id).then(r => {console.log(r);
            this.itemsInput?.splice(i,1);
            if(this.itemsInput?.length===0){
              this.router.navigateByUrl("/main");
            }
            else{
              this.deleteClicked.emit();
            }
          }).catch(err => console.error(err));
          break;
        }
      }
    }
  }

}
