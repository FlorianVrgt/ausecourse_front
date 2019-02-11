import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import {AppConst} from '../constants/app-const' ;
import {Product} from '../models/product' ;
import {CookieService} from 'angular2-cookie/core';
import {ListeCourse} from '../models/ListeCourse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient,
  	private cookieService : CookieService) { }


	getProductList() {
		let url = AppConst.serverPath+"ListeCourse/getById";
		//let params = new HttpParams();
		return this.http.post(url,this.cookieService.get("listId")) ;
	}

	addToShoppingList(product: Product) {
		let url = AppConst.serverPath+"ListeCourse/addToShoppingList";
  		return this.http.post(url, product);

	}

	save(listeCourse : ListeCourse) {
		let url = AppConst.serverPath+"ListeCourse/save";
		let tokenHeader = new HttpHeaders({
			'Content-Type' : 'application/json',
			'x-auth-token' : localStorage.getItem('xAuthToken')
		});

		return this.http.post(url, listeCourse,{headers : tokenHeader, responseType:'text'});
	}

	addProduct(name : string, qty:number) {
		let url = AppConst.serverPath+"ListeCourse/addToList";

		let tokenHeader = new HttpHeaders({
			'Content-Type' : 'application/json',
			'x-auth-token' : localStorage.getItem('xAuthToken')
		});
		let info = {
			"listId" : this.cookieService.get("listId"),
			"name" : name,
			"qty" : qty
		}

		return this.http.post(url, JSON.stringify(info),{headers : tokenHeader, responseType:'text'});
	}
}
