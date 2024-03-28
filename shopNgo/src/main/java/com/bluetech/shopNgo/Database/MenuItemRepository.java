package com.bluetech.shopNgo.Database;

import com.bluetech.shopNgo.Models.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuItemRepository extends JpaRepository<MenuItem , Long> {
}
