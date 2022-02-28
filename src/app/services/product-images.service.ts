import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductImagesService {

  constructor(
    private http: HttpClient
  ) { }

  getImages(productId: number):Observable<any>{
    console.log(productId)
    return this.http.get<any>(`http://localhost:8000/product_image/get_images?id=${productId}`);
  }
}
