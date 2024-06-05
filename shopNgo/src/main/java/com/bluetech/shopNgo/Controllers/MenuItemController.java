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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PostMapping("/addMenuItems")
    public ResponseEntity<?> createMenuItems(@RequestPart("menuItems") List<MenuItem> newMenuItems,
                                             @RequestPart("images") List<MultipartFile> imagesList) {
        if (newMenuItems.size() > (imagesList.size() / 3)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The number of menuItems must match the number of image sets.");
        }

        List<MenuItem> createdMenuItems = new ArrayList<>();
        try {
            Map<String, List<MultipartFile>> groupedImages = new HashMap<>();
            for (MultipartFile image : imagesList) {
                String originalFileName = image.getOriginalFilename();
                String identifier = originalFileName.split("-")[0].toLowerCase(); // Extract and convert to lowercase
                groupedImages.computeIfAbsent(identifier, k -> new ArrayList<>()).add(image);
            }

            // Log the grouped images
            System.out.println("Grouped Images: " + groupedImages);

            for (MenuItem newMenuItem : newMenuItems) {
                String identifier = newMenuItem.getIdentifier().toLowerCase(); // Convert to lowercase for comparison
                List<MultipartFile> images = groupedImages.get(identifier);

                // Log each group of images for debugging
                System.out.println("MenuItem " + identifier + " Images: " + images);

                if (images == null || images.size() < 3) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Each menuItem must have at least 3 images.");
                }

                List<String> storedFileNames = new ArrayList<>();
                for (MultipartFile image : images) {
                    String storedFileName = storageService.store(image);
                    storedFileNames.add(storedFileName);
                }

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
                        newMenuItem.getCategory().getName_AR(),
                        storedFileNames
                );
                createdMenuItems.add(createdMenuItem);
            }

            return new ResponseEntity<>(createdMenuItems, HttpStatus.CREATED);
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