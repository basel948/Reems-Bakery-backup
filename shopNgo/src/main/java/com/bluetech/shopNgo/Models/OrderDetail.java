package com.bluetech.shopNgo.Models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_details")
@Data //@Setter , @Getter , @ToString , @EqualsAndHashCode , @RequiredArgsConstructor
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;

    private Double price;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "menuItem_id")
    private MenuItem menuItem;
}
