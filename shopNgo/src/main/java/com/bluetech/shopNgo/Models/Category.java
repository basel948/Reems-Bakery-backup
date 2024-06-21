package com.bluetech.shopNgo.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.context.annotation.Bean;

import java.util.List;

@Entity
@Table(name = "categories")
@Data //@Setter , @Getter , @ToString , @EqualsAndHashCode , @RequiredArgsConstructor
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name_AR;
    private String name_HE;
    @OneToMany(mappedBy = "category")
    @JsonManagedReference
    private List<MenuItem> menuItems;

    public Category(String name_AR, String name_HE) {
        this.name_AR = name_AR;
        this.name_HE = name_HE;
    }
}
