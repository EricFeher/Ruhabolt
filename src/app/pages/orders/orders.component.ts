import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Order} from "../../shared/models/order";
import {OrderService} from "../../shared/services/order.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit,AfterViewInit {
  orders: Order[]=[];
  dataSource = new MatTableDataSource<Order>(this.orders);
  displayedColumns: string[] = ['ID', 'UID', 'Price', 'Items','Date','Submit'];
  @ViewChild('orderTable') orderTable?: MatTable<any>;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  ngAfterViewInit():void{

  }

  getOrders(){
    this.orderService.getAllOrderedByDate().subscribe(orders=>{
      this.orders=orders;
      console.log("[getAllOrders()]:"+orders);
      this.dataSource = new MatTableDataSource<Order>(this.orders);
      // @ts-ignore
      this.dataSource.paginator=this.paginator;
      this.orderTable?.renderRows();
    })
  }

  submitOrder(element:Order) {
    this.orderService.delete(element.id).then(data=>console.log(data)).catch(err=>console.log(err));
  }
}
