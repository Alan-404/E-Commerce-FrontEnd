import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}

  info: any = {total: 0, products: [], cart: []}
  profile: any = {user: {}, addresses: []}

  loadCart(){
    this.cartService.infoCart().subscribe(response => {
      this.info = response
    })
  }

  ngOnInit(): void {
    this.loadCart();
    this.userService.getProfile().subscribe(response => {
      this.profile = response
    })
  }


  handleDiscount(price: number, discount: number){
    return price*((100-discount)/100)
  }


  moreItem(productId: string, quantity: string){
    this.cartService.addToCart(productId, parseInt(quantity) + 1).subscribe(res => {
      if (res.success){
        this.loadCart();
      }
    })
  }

  lessItem(productId: string, quantity: string){
    var num = parseInt(quantity);
    if (num == 1){
      return;
    }
    this.cartService.addToCart(productId, num - 1).subscribe(res => {
      if (res.success){
        this.loadCart();
      }
    })
  }

}
