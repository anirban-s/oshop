import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { UserService } from './../../user.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders:any = [];

  constructor(private orderService: OrderService, private userService: UserService) { }

  ngOnInit() {
    this.orderService.getOrders().then(orders => {
      this.orders = [];
      for(let order in orders.val()) {
        this.userService.getUser(orders.val()[order].userId).then(user => {
          this.orders.push({
            datePlaced: orders.val()[order].datePlaced,
            username: user.name
          });
        })
      }
    })
  }
}
