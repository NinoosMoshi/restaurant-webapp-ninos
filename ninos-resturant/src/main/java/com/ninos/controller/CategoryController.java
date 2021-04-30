package com.ninos.controller;

import com.ninos.model.Category;
import com.ninos.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // http://localhost:8080/api/allCategories
    @GetMapping("/allCategories")
    public List<Category> getCategories(){
        return categoryService.getAllCategories();
    }



}
