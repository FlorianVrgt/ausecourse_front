import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service' ;
import {Router} from '@angular/router'; 
import {User} from '../../models/user'; 
import {CookieService} from 'angular2-cookie/core';



import {Order} from '../../models/order' ;
import {ListeCourse} from "../../models/ListeCourse" ;
import {OrderService} from "../../services/order.service" ; 



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	private loggedIn : boolean  ; 
	private user : User ; 
	private badgeValue = 0 ; 
 
  constructor(private userService: UserService, 
  	private router:Router,
  	private orderService : OrderService,
  	private cookieService : CookieService) { }


  ngOnInit() {
  	this.userService.checkSession().subscribe(
  		res => {
			this.loggedIn = true ;
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
			this.loggedIn=false;
		}
  	);


  }



  logout() {

  	this.userService.logout().subscribe(
		res => {

		
			this.loggedIn = false ;	
			this.router.navigate(['/']);	
		}, 
		error => {

			console.log(error);

		}

  	);
  	
  }

}
