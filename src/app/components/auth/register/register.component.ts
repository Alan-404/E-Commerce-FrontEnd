import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UserService } from 'src/app/services/user.service';

import { checkTelephone } from 'src/app/common/lib';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private storage: AngularFireStorage,
    private userService: UserService
  ) { }

  imageShow: any = 'http://cdn.onlinewebfonts.com/svg/img_568656.png'

  file: any;

  // user: User = {first_name: '', last_name: '', email: '', password: '', avatar: this.imageShow, role_id: 2, telephone: '', gender: '', country: '', bdate: ''}
  user = new User();

  rePassword = ''

  showErrorForm = false;
  message: string = ''

  ngOnInit(): void {
  }

  uploadImage(event: any){
    this.file = event.target.files[0]

    var reader = new FileReader()
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.imageShow = reader.result
    }
  }

  getInfo(event: any){
    const name = event.target.name;
    const value = event.target.value;
    if (name == 'firstName')
      this.user.first_name = value;
    else if (name == 'lastName')
      this.user.last_name = value;
    else if (name == 'email')
      this.user.email = value;
    else if (name == 'password')
      this.user.password = value;
    else if (name == 'telephone')
      this.user.telephone = value;
    else 
      this.rePassword = value;
  }

  getInfoOption(event: any){
    const name = event.target.name;
    const value = event.target.value;
    if (name == "country"){
      this.user.country = value;
    }
    if (name == "bdate"){
      this.user.bdate = value;
    }
    else{
      this.user.gender = value
    }
  }


  handleError(error: string){
    this.showErrorForm = true;
      this.message = error
      setTimeout(() =>  {
        this.showErrorForm = false,
        this.message = ''
      }, 3000)
  }

  async registerUser(){
    if (this.user.password != this.rePassword){
      this.handleError("Your Password Is Not Matched")
      return;
    }

    if (this.user.last_name == '' || this.user.first_name=='' || this.user.email == '' || this.user.password == '' || this.rePassword==''|| this.user.telephone==''){
      this.handleError("Empty Fields")
      return;
    }

    /* if (!checkTelephone(this.user.telephone)){
      this.handleError("Invalid Phone Number");
      return;
    } */

    if (this.file != null){
      const filePath = '/users/' +  this.file.name + Math.random()


      await this.storage.upload(filePath, this.file)
      .catch(error => {
        return;
      })

      await this.storage.ref(filePath).getDownloadURL().subscribe(async(url) => {
        this.user.avatar = url
        console.log(this.user.avatar)
        await this.userService.registerUser(this.user).subscribe(response => {
          console.log(response)
        }, error => console.log(error.error))
      }) 
      
      return;
    }







  }


  

}
