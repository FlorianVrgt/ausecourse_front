import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable' ;
import {Router} from '@angular/router' ;
import {User} from '../models/user' ;
import {AppConst} from '../constants/app-const' ;
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	private serverPath: string = "http://ausecourseback.herokuapp.com" ;

	constructor(private http: Http, private router:Router,
		private httpClient : HttpClient) { }

	sendCredential(username: string , password: string){
		let url = this.serverPath+"/token";

		let encodeCredentials = btoa(username+":"+password) ;
		let basicHeader = "Basic " + encodeCredentials ;
		let headers = new Headers ({
			'Content-Type' : 'application/x-www-form-urlencoded',
			'Authorization' : basicHeader
		});


		return this.http.get(url,{headers: headers});
	}


	checkSession(){
		let url = this.serverPath+"/checkSession";
		let headers = new Headers ({
		'x-auth-token' : localStorage.getItem('xAuthToken')
		});
		return this.http.get(url,{headers: headers});
	}

	logout(){
		let url = this.serverPath+"/user/logout";
		let headers = new Headers ({
		'x-auth-token' : localStorage.getItem('xAuthToken')
		});
		return this.http.post(url,'',{headers: headers});
	}



	newUser(username: string, email:string, password: string, mode :string, addressLivraison:string, telephone:number) {
		let url = this.serverPath+'/user/newUser';
		let userInfo = {
			"username" : username,
			"email" : email,
			"password" : password,
			"mode" : mode ,
			"addressLivraison" : addressLivraison ,
			"telephone" : telephone
		}
		let tokenHeader = new Headers({
			'Content-Type' : 'application/json',
			'x-auth-token' : localStorage.getItem('xAuthToken')
		});

		return this.http.post(url, JSON.stringify(userInfo), {headers : tokenHeader});
	}


	updateUserInfo(user: User, newPassword: string, currentPassword: string) {
		let url = this.serverPath + "/user/updateUserInfo";
		let userInfo = {
			"id" : user.id,
			"username" : user.username,
			"currentPassword" : currentPassword,
			"email" : user.email,
			"newPassword" :newPassword
		};

		let tokenHeader = new Headers({
			'Content-Type' : 'application/json',
			'x-auth-token' : localStorage.getItem("xAuthToken")
		});
		return this.http.post(url, JSON.stringify(userInfo), {headers:tokenHeader});
	}


	retrievePassword(email:string) {
		let url = this.serverPath+'/user/forgetPassword';
		let userInfo = {
			"email" : email
		}
		let tokenHeader = new Headers({
			'Content-Type' : 'application/json',
			'x-auth-token' : localStorage.getItem('xAuthToken')
		});

		return this.http.post(url, JSON.stringify(userInfo), {headers : tokenHeader});
	}

	getCurrentUser() {
		let url = this.serverPath+'/user/getCurrentUser';

		let tokenHeader = new Headers({
			'Content-Type' : 'application/json',
			'x-auth-token' : localStorage.getItem('xAuthToken')
		});

		return this.http.get(url, {headers : tokenHeader});
	}

	createShoppingList(user : User) {
		let url = AppConst.serverPath+"user/createShoppingList";
  		return this.httpClient.post(url, user.id, {responseType:'text'});

	}

	getAvailableLivreurs(user: User){
		let url = AppConst.serverPath+"user/getLivreurs";
		return this.httpClient.get(url) ;
	}

	getAllOrders(user:User){
		let url = AppConst.serverPath+"order/getAllByIdClient";

		var id = user.id ;
		return this.httpClient.post(url,id);
	}

	notifyLivreur(order: Order){
		let url = this.serverPath+'/user/notifyLivreur';

		let tokenHeader = new Headers({
			'Content-Type' : 'application/json',
			'x-auth-token' : localStorage.getItem('xAuthToken')
		});

		return this.http.post(url, order, {headers : tokenHeader});
	}

	getNotifications(id : string){
		let url = this.serverPath+'/user/getNotification';

		let tokenHeader = new Headers({
			'Content-Type' : 'application/json',
			'x-auth-token' : localStorage.getItem('xAuthToken')
		});

		return this.http.post(url, id, {headers : tokenHeader});

	}

	getUserById(userId : string){
		let url = this.serverPath+'/user/getUserById';

		let tokenHeader = new Headers({
			'Content-Type' : 'application/json',
			'x-auth-token' : localStorage.getItem('xAuthToken')
		});

		return this.http.post(url, userId, {headers : tokenHeader});
	}

	makeReview(livreurId : string , nbStars : string) {
		let url = this.serverPath+'/user/makeReview';
		let userInfo = {
			"livreurId" : livreurId,
			"nbStars" : nbStars,
		}
		let tokenHeader = new Headers({
			'Content-Type' : 'application/json',
			'x-auth-token' : localStorage.getItem('xAuthToken')
		});

		return this.http.post(url, JSON.stringify(userInfo), {headers : tokenHeader});

	}

}
