package com.bluetech.shopNgo.Models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Setter
@Getter
@ToString
public class OrderRequest {
    private String totalPrice;
    private List<Item> items;

}
