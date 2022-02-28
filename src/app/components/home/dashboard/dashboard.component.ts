import { Component, HostListener, OnInit } from '@angular/core';
import { BannerService } from 'src/app/services/banner.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private bannerService: BannerService,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  banners: any

  categories: any

  btnCarousel: any = []

  infoProducts: any = {products: [], categories: [], thumnails: [], distributors: [], discounts: []}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    // console.log(event)
  }
  

  ngOnInit(): void {
    /* if (!localStorage.getItem('e-commerce')){
      this.router.navigate(['auth/login'])
    } */
    this.bannerService.getAllBanners().subscribe(response => {
      this.banners = response.banners
      for (var i = 1; i<this.banners.length; ++i){
        this.btnCarousel.push(i)
      }
    })
    this.categoryService.getAllCategories().subscribe(response => {
      this.categories = response.categories
      /* for (let category of this.categories){
        console.log(category.id)
      } */
    })

    this.productService.getProductsForDashboard().subscribe(response => {
      this.infoProducts = response
    }) 
  }

  
  handleDiscount(price: number, discount: number){
    return price*((100-discount)/100)
  }

  scrollPage(event: any){
    console.log(event)
  }

  goToCategoryPage(id: string){
    this.router.navigate(['home/category'], {queryParams: {id}})
  }

  addToCart(productId: string){
    
  }

  seeMoreProduct(id: number){
    this.router.navigate(['home/product'], {queryParams: {id}})
  }


}
