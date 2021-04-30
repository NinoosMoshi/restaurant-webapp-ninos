import { Category } from './../../model/category';
import { CategoryService } from './../../services/category.service';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop-menu',
  templateUrl: './drop-menu.component.html',
  styleUrls: ['./drop-menu.component.css']
})
export class DropMenuComponent implements OnInit {

  categories: Category[]=[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }


  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(
      data =>{
        this.categories = data
      }
    )
  }




}
