import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service' ;
import { ProductService } from '../../services/product.service' ;
import { OrderService } from '../../services/order.service' ;
import { ListeCourse } from '../../models/ListeCourse' ;
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../../models/user' ; 
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

	private listeCourse: ListeCourse ; 
	private id : string ; //order id 
	private clientId: string ;
	private client : User ;


  constructor(private userService :UserService,
  	private orderService : OrderService , 
  	private productService : ProductService,
  	private route: ActivatedRoute,
  	private router: Router,
    private snackBar: MatSnackBar) {}

  onProgress() {
    this.orderService.onProgress(this.id).subscribe(
      (res: string) => {
         console.log(res); 
        this.openSnackBar("onProgress");
      },
      error => {
        console.log(error) ; 
      } 
    );
  }

  onDelivered(){

  	this.orderService.onDelivered(this.id).subscribe(
      (res: string) => {
       	console.log(res); 
        this.openSnackBar("Delivered");
      },
      error => {
        console.log(error) ; 
       }  
  	);
  	
  }

  onPaid(){
  	this.orderService.onPaid(this.id).subscribe(
      (res: string) => {
       	console.log(res); 
        this.openSnackBar("Paid");

      },
      error => {
        console.log(error) ; 
       }  
  	);

  }

  openSnackBar(state : string) {
    console.log("open snack bar");
    this.snackBar.open("vous avez passez l'état de cette commande à " + state, null, {
      duration: 2000,
    });

  }      

  ngOnInit() {
  	this.id =this.route.snapshot.paramMap.get('id');
  	this.clientId = this.route.snapshot.paramMap.get('clientId');

  	this.userService.getUserById(this.clientId).subscribe(
      	res => {
        this.client = res.json() ;
      },
      error => {
        console.log(error) ; 
       }  
  	);
  	this.orderService.getListByOrderId(this.id).subscribe(
      (res:ListeCourse) => {
        this.listeCourse = res ;
      },
      error => {
        console.log(error) ; 
       }  		
  	);
  }

}
