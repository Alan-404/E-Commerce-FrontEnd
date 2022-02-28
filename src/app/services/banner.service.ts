import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(
    private http: HttpClient
  ) { }


  getAllBanners():Observable<any>{
    return this.http.get<any>(`${apiUrl}/banner/banner_api`)
  }
}
