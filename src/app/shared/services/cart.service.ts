import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Cart} from "../models/cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  collectionName = 'Cart';
  constructor(private afs: AngularFirestore) { }

  create(cart: Cart) {
    cart.id=this.afs.createId();
    return this.afs.collection<Cart>(this.collectionName).doc(cart.id).set(cart);
  }

  getAll() {
    return this.afs.collection<Cart>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Cart>(this.collectionName).doc(id).valueChanges();
  }

  update(cart: Cart) {
    return this.afs.collection<Cart>(this.collectionName).doc(cart.id).set(cart);
  }

  getCartByUid(uid: string) {
    return this.afs.collection<Cart>(this.collectionName,ref => ref.where('uid','==',uid)).valueChanges();
  }

  delete(id: string) {
    return this.afs.collection<Cart>(this.collectionName).doc(id).delete();
  }

  deleteFromCart(item: Cart) {
    this.delete(item.id).then(_=> console.log("Deleted from cart"));
  }

}
