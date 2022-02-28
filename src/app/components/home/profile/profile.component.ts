import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  infoUser: any = {user: {}, addresses: []}

  male = true;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(response => {
      this.infoUser = response
      console.log(this.infoUser.user.gender)
      if (this.infoUser.user.gender != "Male"){
        this.male = false;
      }
    })
  }

  formatDate(date: string){
    var arrayDate = date.split('-')
    var dateShow = arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0]
    return dateShow
  }

}
