import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {ShoppingItem} from "../models/shoppingItem";
import {Cart} from "../models/cart";
import {CartService} from "./cart.service";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  collectionName ='ShoppingItems'
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private cartService: CartService) { }

  loadShoppingItemImage(imageUrl: string): Observable<string>{
    return this.storage.ref(imageUrl).getDownloadURL();
  }

  create(shoppingItem: ShoppingItem) {
    return this.afs.collection<ShoppingItem>(this.collectionName).doc(shoppingItem.id).set(shoppingItem);
  }

  getAll() {
    return this.afs.collection<ShoppingItem>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<ShoppingItem>(this.collectionName).doc(id).valueChanges();
  }

  update(shoppingItem: ShoppingItem) {
    return this.afs.collection<ShoppingItem>(this.collectionName).doc(shoppingItem.id).set(shoppingItem);
  }

  delete(id: string) {
    return this.afs.collection<ShoppingItem>(this.collectionName).doc(id).delete();
  }

  async decreaseItemByOne(item: Cart) {
    // storage.getItemById();
    let storageItem: ShoppingItem;

    this.getById(item.itemsID).subscribe(result => {
      storageItem = result as ShoppingItem;
    });

    await this.delay(200);

    // @ts-ignore;
    storageItem.count--;

    // @ts-ignore;
    this.update(storageItem).then(_ => {
      console.log(`[STORAGE] Decrease item by one: ${storageItem.count}`)
    }).catch(err => {
      console.error(`[STORAGE] Error while decreasing item: ${storageItem.id}`)
      console.error(err)
    });
  }

  delay(delayInms:number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }

}
