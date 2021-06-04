import { Category } from './../../model/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/security/authentication.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[]=[];

  constructor(private categoryService: CategoryService, private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe(
      data =>{
        this.categories = data
      }
    )
  }

  isLogined(){
    return this.authenticationService.isLogin();
  }

}
