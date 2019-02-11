import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service' ; 
import {Order} from "../../models/order" ; 
import {User} from "../../models/user" ;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

	private orders : Order[] ; 
	private currentUser : User ;
 

  constructor(private userService :UserService) { }

  getAllOrders(user:User) {
  	this.userService.getAllOrders(user).subscribe(
		(res:Order[]) => {
			this.orders = res ;

      for (let i = 0; i < this.orders.length ; i++) {
        this.orders[i].string = this.orders[i].listeCourse.listeCourse[0].nom;
        for (let j = 1; j < this.orders[i].listeCourse.listeCourse.length ; j++) {
          this.orders[i].string = this.orders[i].string + ", " + this.orders[i].listeCourse.listeCourse[j].nom ;   
        }  
             
      }

		},
		error => {
			console.log(error) ; 
		}  		
  	);
  }

  ngOnInit() {

  	this.userService.getCurrentUser().subscribe(
      res => {
        this.currentUser = res.json(); 
        this.getAllOrders(this.currentUser); 

      },
      error => {
        console.log(error);
      }     
  	);   

  }

}
