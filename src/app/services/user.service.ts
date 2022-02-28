import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject} from 'rxjs';

import { apiUrl } from '../common/constants';
import { googleKey } from '../common/secret';

import { User } from '../models/user';

const headerOption = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${localStorage.getItem('e-commerce')}`
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private auth2: gapi.auth2.GoogleAuth
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1)
  constructor(
    private http: HttpClient,
    
  ) {
    gapi.load('auth2', ()=> {
      this.auth2 = gapi.auth2.init({
        client_id: googleKey

      })
    })
  }

  loginUser(loginData: any):Observable<any>{
    return this.http.post<any>(`${apiUrl}/user/auth_user`, loginData)
  }

  getUserToken():Observable<any>{
    return this.http.get<any>(`${apiUrl}/user/auth_user`, headerOption)
  }

  public signIn(){
    this.auth2.signIn({
      scope: 'https://www.googleapis.com/auth/gmail.readonly'
    })
    .then(user => {
      this.subject.next(user)
    })
    .catch(() => {
      this.subject.next(undefined)
    })
  }


  public signOut(){
    this.auth2.signOut()
      .then(() => {
        this.subject.next(undefined)
      })
  }


  public observable(): Observable<gapi.auth2.GoogleUser>{
    return this.subject.asObservable()
  }

  loginAccountGoogle(email: string):Observable<any>{
    return this.http.post<any>(`${apiUrl}/user/login_google`, {email})
  }

  getProfile():Observable<any>{
    return this.http.get<any>(`${apiUrl}/user/profile`, headerOption)
  }

  registerUser(user: User):Observable<any>{
    return this.http.post<any>(`${apiUrl}/user/user_api`, user)
  }


}
