import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Admin} from "../models/admin";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  collectionName = 'Admin';

  constructor(private afs: AngularFirestore) { }

  create(user: Admin) {
    return this.afs.collection<Admin>(this.collectionName).doc(user.id).set(user);
  }

  getAll() {
    return this.afs.collection<Admin>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Admin>(this.collectionName).doc(id).valueChanges();
  }

  getByUid(uid: string) {
      return this.afs.collection<Admin>(this.collectionName, ref => ref.where("uid","==",uid)).valueChanges();
    }

  update(user: Admin) {
    return this.afs.collection<Admin>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string) {
    return this.afs.collection<Admin>(this.collectionName).doc(id).delete();
  }
}
