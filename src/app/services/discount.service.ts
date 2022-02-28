import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(
    private http: HttpClient
  ) { }

  getDiscountByProduct(productId: number):Observable<any>{
    return this.http.get<any>(`${apiUrl}/discount/get_discount?id=${productId}`);
  }
}
