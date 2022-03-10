import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders:any = [];

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
    this.orderService.getOrders().then(orders => {
      this.orders = [];
      for(let order in orders.val()) {
        this.authService.user$.subscribe(user => {
          if(user.uid === orders.val()[order].userId) {
            this.orders.push({
              datePlaced: orders.val()[order].datePlaced,
              username: user.displayName
            });
          }
        })
      }
    })
  }

}
