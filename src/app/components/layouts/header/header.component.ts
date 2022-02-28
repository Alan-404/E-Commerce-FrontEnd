import { Component, OnChanges, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  authOption = false

  info: any

  checkLogin = false

  confirmLogout = false

  ngOnInit(): void {
    if (localStorage.getItem('e-commerce')){
      this.checkLogin = true
    }
    if (localStorage.getItem('e-commerce')){
      this.userService.getUserToken().subscribe(response => {
        this.info = response.user
      })
    }
  }


  showAuthOption(){
    this.authOption = true
  }

  goBackNormal(){
    this.authOption = false
  }


  goHome(){
    this.router.navigate(['/home/dashboard'])
  }

  logoutAccount(){
    this.confirmLogout = true;
    this.authOption = false
  }

  closeFormConfirm(){
    this.confirmLogout = false;
  }

  confirmLogoutAccount(){
    localStorage.removeItem('e-commerce')
    this.checkLogin = false
    this.confirmLogout = false;
  }

  goCartPage(){
    this.router.navigate(['home/cart'])
  }

}
