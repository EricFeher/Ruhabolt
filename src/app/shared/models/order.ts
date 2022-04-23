import {ShoppingItem} from "./shoppingItem";

export interface Order{
  id: string;
  uid: string;
  price: number;
  itemsID: Array<string>;
  dateOfOrder: number;
}
