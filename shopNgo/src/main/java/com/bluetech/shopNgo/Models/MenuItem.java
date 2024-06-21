package com.bluetech.shopNgo.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Base64;
import java.util.List;

@Entity
@Data //@Setter , @Getter , @ToString , @EqualsAndHashCode , @RequiredArgsConstructor
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String identifier;
    private String name_AR;
    private String name_HE;
    private String description_AR;
    private String description_HE;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference
    private Category category;
    private Double price;
    private Integer numberOfServings;

    @ElementCollection
    private List<String> imagePaths;

    private Integer numberOfPurchases;
    private String estimatedProcessingTime_AR;
    private String estimatedProcessingTime_HE;

    @ElementCollection
    private List<String> ingredients_AR;

    @ElementCollection
    private List<String> ingredients_HE;


}
