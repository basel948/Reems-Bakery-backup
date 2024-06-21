package com.bluetech.shopNgo.Database;

import com.bluetech.shopNgo.Models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT c FROM Category c WHERE c.name_AR = :name OR c.name_HE = :name")
    Optional<Category> findByName(String name);

}
