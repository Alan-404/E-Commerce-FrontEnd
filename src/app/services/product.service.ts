import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../common/constants';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProductsForDashboard():Observable<any>{
    return this.http.get<any>(`${apiUrl}/product/dashboard`)
  }

  getProductsCategory(id: number, index: number):Observable<any>{
    return this.http.get<any>(`${apiUrl}/product/category?id=${id}&&index=${index}`)
  }

  getProduct(id: number):Observable<any>{
    return this.http.get<any>(`${apiUrl}/product/get_product?id=${id}`);
  }
}
