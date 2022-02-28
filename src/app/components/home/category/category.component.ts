import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }


  index=1;

  infoProducts: any = {}

  categoryId: number;

  category: any = {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.categoryId = params.id;
    })
    this.categoryService.getCategory(this.categoryId).subscribe(response=>{
      this.category = response.category
    })
    this.productService.getProductsCategory(this.categoryId, this.index).subscribe(response=>{
      this.infoProducts = response
    })
  
  }

  handleDiscount(price: number, discount: number){
    return price*((100-discount)/100)
  }

}
