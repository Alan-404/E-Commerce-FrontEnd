import { Component, NgZone, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { Router } from '@angular/router';

declare var FB: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  loginData: any = {email:'', password: ''};

  message: string = ''

  user: gapi.auth2.GoogleUser

  showErrorForm = false;

  spinner = false


  loadFaceBook(){
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : 652450312436510,
        cookie     : true,
        xfbml      : true,
        version    : 'v12.0'
      });
        
      FB.AppEvents.logPageView();   
        
    };
  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       (js as any).src = "https://connect.facebook.net/en_US/sdk.js";
       (fjs as any).parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  ngOnInit(): void {
    this.userService.observable().subscribe(user => {
      this.user = user;
      if (this.user){
        this.userService.loginAccountGoogle(this.user.getBasicProfile().getEmail()).subscribe(response => {
          if (response.success){
            localStorage.setItem('e-commerce', response.token)
            this.ngZone.run(() => this.router.navigate(['home/dashboard'])).then(() => window.location.reload())
            
          }
        }, () => {
          this.message = 'Invalid email or password';
          this.showErrorForm = true
          setTimeout(() => {
            this.message = '',
            this.showErrorForm=false
          }, 3000)
        })
      }
    })

    this.loadFaceBook()
  }

  getInfo(event: any){
    const name = event.target.name;
    const value = event.target.value;
    if (name == "email")
      this.loginData.email = value;
    else
      this.loginData.password = value;
  }


  submitLogin(){
    this.spinner = true
    if (this.loginData.email == '' || this.loginData.password == ''){
      this.message = 'Empty Fields';
      this.showErrorForm = true
      this.spinner=false
      setTimeout(() => {
        this.message=''
        this.showErrorForm = false;
      }, 3000)
      return;
    }
    this.userService.loginUser(this.loginData).subscribe(response=>{
      if (response.success){
        localStorage.setItem('e-commerce', response.token)
        this.router.navigate(['home/dashboard']).then(() => {window.location.reload()})
      }
    }, () => {
      this.spinner=false
      this.message = 'Invalid email or password';
      this.showErrorForm = true
      setTimeout(() => {
        this.message = '',
        this.showErrorForm=false
      }, 3000)
    })
    
  }

  async loginAccountFacebook(){
    await FB.login(async (response: any) => {
      console.log(response)
    })
  }

  signInGoogle(){
    this.userService.signIn()
  }

  

}
