import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../common/constants';
const headerOption = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${localStorage.getItem('e-commerce')}`
  })
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) { }


  infoCart():Observable<any>{
    return this.http.get<any>(`${apiUrl}/cart/info_cart`, headerOption)
  }

  addToCart(productId: string, quantity: number):Observable<any>{
    return this.http.post<any>(`${apiUrl}/cart/cart_api`, {product_id: productId, quantity}, headerOption)
  }
}
