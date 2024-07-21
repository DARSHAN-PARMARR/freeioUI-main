import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrls: ['./paymentsuccess.component.scss']
})
export class PaymentsuccessComponent implements OnInit {
  orderDetails: Order| null = null;
  orderId: number = 1; // Replace with actual order ID

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrderDetails();
  }

  fetchOrderDetails(): void {
    this.orderService.getOrderDetails(this.orderId).subscribe(
      (data) => {
        this.orderDetails = data;
      },
      (error) => {
        console.error('Error fetching order details', error);
      }
    );
  }
}