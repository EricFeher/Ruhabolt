import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  collectionName = 'Orders';

  constructor(private afs: AngularFirestore) { }

  create(order: Order) {
    order.id=this.afs.createId();
    return this.afs.collection<Order>(this.collectionName).doc(order.id).set(order);
  }

  getAll() {
    return this.afs.collection<Order>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Order>(this.collectionName).doc(id).valueChanges();
  }

  update(order: Order) {
    return this.afs.collection<Order>(this.collectionName).doc(order.id).set(order);
  }

  delete(id: string) {
    return this.afs.collection<Order>(this.collectionName).doc(id).delete();
  }
}
