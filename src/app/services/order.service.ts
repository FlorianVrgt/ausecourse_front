import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Order } from '../models/order' ;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

	private serverPath: string = "http://ausecourseback.herokuapp.com" ; 

  constructor(private httpClient : HttpClient) { }

  createOrder(order : Order){
		let url = this.serverPath+'/order/createOrder';

		let tokenHeader = new HttpHeaders({
			'Content-Type' : 'application/json',
			'x-auth-token' : localStorage.getItem('xAuthToken')
		});

		return this.httpClient.post(url, order, {headers : tokenHeader});
  }

  getOrderByListId(listId:string){
		let url = this.serverPath+'/order/getOrderByListId';

		let tokenHeader = new HttpHeaders({
			'Content-Type' : 'application/json',
			'x-auth-token' : localStorage.getItem('xAuthToken')
		});

		return this.httpClient.post(url, listId, {headers : tokenHeader});
  }

  getListByOrderId(orderId:string) {
	let url = this.serverPath+'/order/getListByOrderId';

	let tokenHeader = new HttpHeaders({
		'Content-Type' : 'application/json',
		'x-auth-token' : localStorage.getItem('xAuthToken')
	});

	return this.httpClient.post(url, orderId, {headers : tokenHeader});
  }

  acceptOrder(idOrder:string){
		let url = this.serverPath+'/order/acceptOrder';

		let tokenHeader = new HttpHeaders({
			'Content-Type' : 'application/json',
			'x-auth-token' : localStorage.getItem('xAuthToken')
		});

		return this.httpClient.post(url, idOrder, {headers : tokenHeader,responseType:'text'});
  }

  onDelivered(idOrder:string){
		let url = this.serverPath+'/order/orderDone';

		let tokenHeader = new HttpHeaders({
			'Content-Type' : 'application/json',
			'x-auth-token' : localStorage.getItem('xAuthToken')
		});

		return this.httpClient.post(url, idOrder, {headers : tokenHeader,responseType:'text'});
  }

  onPaid(idOrder:string){
		let url = this.serverPath+'/order/orderPayed';

		let tokenHeader = new HttpHeaders({
			'Content-Type' : 'application/json',
			'x-auth-token' : localStorage.getItem('xAuthToken')
		});

		return this.httpClient.post(url, idOrder, {headers : tokenHeader,responseType:'text'});

  }

  onProgress(idOrder : string){
		let url = this.serverPath+'/order/orderInProgress';

		let tokenHeader = new HttpHeaders({
			'Content-Type' : 'application/json',
			'x-auth-token' : localStorage.getItem('xAuthToken')
		});

		return this.httpClient.post(url, idOrder, {headers : tokenHeader,responseType:'text'});
  	

  }

}
