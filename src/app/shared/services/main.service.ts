import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {ShoppingItem} from "../models/shoppingItem";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  collectionName ='ShoppingItems'
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage) { }

  loadShoppingItemMeta(): Observable<Array<ShoppingItem>>{
    return this.afs.collection<ShoppingItem>(this.collectionName).valueChanges();
  }

  loadShoppingItemImage(imageUrl: string): Observable<string>{
    return this.storage.ref(imageUrl).getDownloadURL();
  }
}
