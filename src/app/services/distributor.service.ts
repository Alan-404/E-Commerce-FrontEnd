import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../common/constants';
@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  constructor(
    private http: HttpClient
  ) { }

  getDistributor(distributorId: number):Observable<any>{
    return this.http.get<any>(`${apiUrl}/distributor/get_distributor?id=${distributorId}`);
  }
}
