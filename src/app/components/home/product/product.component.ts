import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Discount } from 'src/app/models/discount';
import { Distributor } from 'src/app/models/distributor';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/productImage';
import { ProductService } from 'src/app/services/product.service';
import { DiscountService } from 'src/app/services/discount.service';
import { CategoryService } from 'src/app/services/category.service';
import { DistributorService } from 'src/app/services/distributor.service';
import { ProductImagesService } from 'src/app/services/product-images.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  handleDiscount(price: number, discount: number){
    return price*((100-discount)/100)
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private discountService: DiscountService,
    private categoryService: CategoryService,
    private distributorService: DistributorService,
    private productImageService: ProductImagesService
  ) { }


  productId: number = 0;
  product = new Product();
  category = new Category();
  discount = new Discount();
  distributor = new Distributor();
  images: any;

  imageShow: any;


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params=> {
      this.productId = params.id;
    })
    this.productService.getProduct(this.productId).subscribe(response => {
      this.product = response.product;
      this.discountService.getDiscountByProduct(this.product.id).subscribe(repDiscount => {
        this.discount = repDiscount.discount;
      })
      this.categoryService.getCategory(this.product.category_id).subscribe(repCategory => {
        this.category = repCategory.category;
      })
      this.distributorService.getDistributor(this.product.distributor_id).subscribe(repDistributor => {
        this.distributor = repDistributor.distributor
      })
      this.productImageService.getImages(this.product.id).subscribe(repImaegs => {
        this.images = repImaegs.images;
        for (let image of this.images){
          if (image.thumnail){
            this.imageShow = image.image
          }
        }
      })
    })
    
  }

  changeImageShow(imageToShow: String){
    this.imageShow = imageToShow;
  }

}
