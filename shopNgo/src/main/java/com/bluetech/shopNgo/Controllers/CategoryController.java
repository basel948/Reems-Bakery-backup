package com.bluetech.shopNgo.Controllers;

import com.bluetech.shopNgo.Database.CategoryRepository;
import com.bluetech.shopNgo.Exceptions.ResourceNotFoundException;
import com.bluetech.shopNgo.Models.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth/category")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;


    @GetMapping
    public List<Category> getAllCategories() {return categoryRepository.findAll();}

    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Long id){
        return categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category with Id " + id + " was not found"));
    }


    @PostMapping("/addCategory")
    public Category createCategory(@RequestBody Category category){return categoryRepository.save(category);}

    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable Long id , @RequestBody Category categoryDetails){
        Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category with Id " + id + " was not found"));
        category.setName_AR(categoryDetails.getName_AR());
        category.setMenuItems(categoryDetails.getMenuItems());

        return categoryRepository.save(category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category with Id " + id + " was not found"));
        categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
