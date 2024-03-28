package com.bluetech.shopNgo.Service;

import com.bluetech.shopNgo.Database.CategoryRepository;
import com.bluetech.shopNgo.Database.MenuItemRepository;
import com.bluetech.shopNgo.Exceptions.ResourceNotFoundException;
import com.bluetech.shopNgo.Models.Category;
import com.bluetech.shopNgo.Models.MenuItem;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor //automatically generates a constructor that initializes all final fields
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final CategoryRepository categoryRepository;

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    public MenuItem getMenuItemById(Long id) {
        return menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product with Id " + id + " was not found"));
    }


    @Transactional
    public MenuItem createMenuItem(String name_AR, String name_HE, String description_AR, String description_HE, Double price, String estimatedProcessingTime_AR,String estimatedProcessingTime_HE, Integer numberOfServings , Integer numberOfPurchases ,List<String> ingredients_AR,List<String> ingredients_HE, String category , List<String> imagePaths){

        System.out.println("in the TOP OF createMenuItem SERVICE");

        MenuItem menuItem = new MenuItem();
        menuItem.setName_AR(name_AR);
        menuItem.setName_HE(name_HE);
        menuItem.setDescription_AR(description_AR);
        menuItem.setDescription_HE(description_HE);
        menuItem.setPrice(price);
        menuItem.setEstimatedProcessingTime_AR(estimatedProcessingTime_AR);
        menuItem.setEstimatedProcessingTime_HE(estimatedProcessingTime_HE);
        menuItem.setNumberOfServings(numberOfServings);
        menuItem.setNumberOfPurchases(numberOfPurchases);
        menuItem.setIngredients_AR(ingredients_AR);
        menuItem.setIngredients_HE(ingredients_HE);
        menuItem.setCategory(findCategoryByNameOrId(category));
        menuItem.setImagePaths(imagePaths);
        System.out.println("in the BOTTOM OF createMenuItem SERVICE");

        return menuItemRepository.save(menuItem);
    }

    public Category findCategoryByNameOrId(String category) {
        System.out.println(category);
        try {
            Long id = Long.parseLong(category);  // No need to declare it as final here
            return categoryRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Category with Id " + id + " was not found"));
        } catch (NumberFormatException e) {
            System.out.println(category);
            return categoryRepository.findByName(category)
                    .orElseThrow(() -> new ResourceNotFoundException("Category with name " + category + " was not found"));
        }
    }


    public MenuItem updateItemCounter(Long menuItemId, int quantityPurchased) throws ResourceNotFoundException{
        MenuItem menuItem = menuItemRepository.findById(menuItemId).orElseThrow(() -> new ResourceNotFoundException("MenuItem with id " + menuItemId + " was not found"));

        int currentPurchases = menuItem.getNumberOfPurchases() == null ? 0 : menuItem.getNumberOfPurchases();
        menuItem.setNumberOfPurchases(currentPurchases + quantityPurchased);
        return menuItemRepository.save(menuItem);

    }

    public void updateMenuItem(Long menuItemId , MenuItem menuItemDetails){

        MenuItem menuItem = menuItemRepository.findById(menuItemId).orElseThrow(() -> new ResourceNotFoundException("MenuItem with id " + menuItemId + " was not found"));
        menuItem.setName_AR(menuItemDetails.getName_AR());
        menuItem.setName_HE(menuItemDetails.getName_HE());
        menuItem.setDescription_AR(menuItemDetails.getDescription_AR());
        menuItem.setDescription_HE(menuItemDetails.getDescription_HE());
        menuItem.setPrice(menuItemDetails.getPrice());
        menuItem.setEstimatedProcessingTime_AR(menuItemDetails.getEstimatedProcessingTime_AR());
        menuItem.setEstimatedProcessingTime_HE(menuItemDetails.getEstimatedProcessingTime_HE());
        menuItem.setNumberOfServings(menuItemDetails.getNumberOfServings());
        menuItem.setNumberOfPurchases(menuItemDetails.getNumberOfPurchases());
        menuItem.setIngredients_AR(menuItemDetails.getIngredients_AR());
        menuItem.setIngredients_HE(menuItemDetails.getIngredients_HE());
        menuItem.setCategory(findCategoryByNameOrId(menuItemDetails.getCategory().getName_AR()));
        menuItem.setImagePaths(menuItemDetails.getImagePaths());

        menuItemRepository.save(menuItem);
    }
    public void deleteMenuItem(Long menuItemId){
        MenuItem menuItem = menuItemRepository.findById(menuItemId).orElseThrow(() -> new ResourceNotFoundException("MenuItem with id " + menuItemId + " was not found"));
        menuItemRepository.delete(menuItem);
    }


}