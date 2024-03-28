package com.bluetech.shopNgo.Controllers;

import com.bluetech.shopNgo.Exceptions.ResourceNotFoundException;
import com.bluetech.shopNgo.Models.MenuItem;
import com.bluetech.shopNgo.Service.MenuItemService;
import com.bluetech.shopNgo.Service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/auth/menuItems")
@RequiredArgsConstructor //automatically generates a constructor that initializes all final fields
public class MenuItemController {

//    Business Logic: The Service class (MenuItemService in this case) is intended to contain all the business logic,
//    validations, and calculations for a specific entity (e.g., MenuItem).
//    Right now, the methods are simple CRUD operations,
//    but as your application grows, you may need to add more complex logic,
//    such as calculating discounts, detecting allergens, etc.

    //here we used constructor-based injection with final field
    private final MenuItemService menuItemService;

    @Autowired
    private StorageService storageService;

    @GetMapping
    public List<MenuItem> getAllMenuItems(){
        return menuItemService.getAllMenuItems();
    }

    @GetMapping("/{id}")
    public MenuItem getMenuItemById(@PathVariable Long id){
        return menuItemService.getMenuItemById(id);
    }

    @PostMapping("/addMenuItem")
    public ResponseEntity<MenuItem> createMenuItem(@RequestPart("menuItem") MenuItem newMenuItem,
                                                   @RequestPart("images") MultipartFile[] images) {
        System.out.println("in the TOP OF createMenuItem CONTROLLER");
        try {
            // Store the images and get the stored file names
            List<String> storedFileNames = new ArrayList<>();
            for (MultipartFile image : images) {
                String storedFileName = storageService.store(image);
                storedFileNames.add(storedFileName);
            }

            // Create the menu item
            MenuItem createdMenuItem = menuItemService.createMenuItem(
                    newMenuItem.getName_AR(),
                    newMenuItem.getName_HE(),
                    newMenuItem.getDescription_AR(),
                    newMenuItem.getDescription_HE(),
                    newMenuItem.getPrice(),
                    newMenuItem.getEstimatedProcessingTime_AR(),
                    newMenuItem.getEstimatedProcessingTime_HE(),
                    newMenuItem.getNumberOfServings(),
                    newMenuItem.getNumberOfPurchases(),
                    newMenuItem.getIngredients_AR(),
                    newMenuItem.getIngredients_HE(),
                    newMenuItem.getCategory().getName_AR(), // Or however you're identifying the category
                    storedFileNames // Set the stored file names as imagePaths
            );
            System.out.println("in the BOTTOM OF createMenuItem CONTROLLER");

            return new ResponseEntity<>(createdMenuItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}/purchase")
    public ResponseEntity<MenuItem> updateItemCounter(@PathVariable Long id, @RequestParam("quantity") int quantity)
            throws ResourceNotFoundException {
        MenuItem updatedMenuItem = menuItemService.updateItemCounter(id, quantity);
        return ResponseEntity.ok(updatedMenuItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem menuItemDetails) {
        menuItemService.updateMenuItem(id, menuItemDetails);
        return ResponseEntity.ok().build();

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMenuItem(@PathVariable Long id){
        menuItemService.deleteMenuItem(id);
        return ResponseEntity.ok().build(); // or you can return ResponseEntity.noContent().build();
    }
}