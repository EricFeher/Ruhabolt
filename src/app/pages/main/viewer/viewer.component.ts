import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ShoppingItem} from "../../../shared/models/shoppingItem";
import {Router} from "@angular/router";
import {MainService} from "../../../shared/services/main.service";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  items: Array<ShoppingItem> = []


  constructor(
    private router: Router,
    private mainService: MainService
  ) { }

  ngOnInit(): void {
    console.log("boi2");
    this.mainService.loadShoppingItemMeta().subscribe((data: Array<ShoppingItem>) =>{
      console.log(data);
      this.items=data;
      for(let item of this.items){
        this.mainService.loadShoppingItemImage(item.imageUrl+"").subscribe((data:string) => {
          console.log(data);
          item.imageUrl=data;
        });
      }
    });
  }

  toCart(item: ShoppingItem) {
    console.log(item.name);
    //TODO: add to cart
  }

  loadImage(image: string){
    this.mainService.loadShoppingItemImage(image).subscribe((data:string) => {
      console.log(data);
    });
  }
}
