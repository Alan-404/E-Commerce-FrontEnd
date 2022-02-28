import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }


  getAllCategories():Observable<any>{
    return this.http.get<any>(`${apiUrl}/category/category_api`)
  }

  getCategory(id: number):Observable<any>{
    return this.http.get<any>(`${apiUrl}/category/get?id=${id}`)
  }

}
