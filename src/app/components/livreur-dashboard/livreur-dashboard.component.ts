import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service' ;
import {User} from '../../models/user'; 
import {Order} from '../../models/order' ;
import {ListeCourse} from "../../models/ListeCourse" ;
import {OrderService} from "../../services/order.service" ; 
import {Router} from '@angular/router' ;
import {OrderState} from '../../models/orderState' ;
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-livreur-dashboard',
  templateUrl: './livreur-dashboard.component.html',
  styleUrls: ['./livreur-dashboard.component.css']
})
export class LivreurDashboardComponent implements OnInit {

	private loggedIn = false ; 
	private user : User ; 
	private courses : ListeCourse[] ; 
  private order : Order ;
  private accepted : boolean ; 


  constructor(private router : Router , 
    private userService: UserService,
    private orderService : OrderService,
    private snackBar: MatSnackBar) { }



  onAccept(order : Order){
        this.orderService.acceptOrder(order.id).subscribe(
          (res:string) => {
            console.log(res); 
            this.accepted = true ;
            //this.openSnackBar();
        this.userService.getCurrentUser().subscribe(
          res => {
            this.user = res.json(); 

          },
          error => {
            this.loggedIn=false;
          }      
        );            
          },
          error => {
            console.log(error);
          }
        );    
  }

  openSnackBar() {
    this.snackBar.open("vous venez d'accepter une commande", null, {
      duration: 2000,
    });
  }    

  onRefuse(){

  }

  onDisplayOrder(order :Order) {
    this.router.navigate(['/orderDetails',order.id, order.clientID]);
  }

  ngOnInit() {
    this.userService.checkSession().subscribe(
      res => {
        this.loggedIn=true;
      },
      error => {
        this.loggedIn=false;
      }
    );



    this.userService.getCurrentUser().subscribe(
      res => {
        this.user = res.json(); 

      },
      error => {
        this.loggedIn=false;
      }      
    );  	  	
  }

}
