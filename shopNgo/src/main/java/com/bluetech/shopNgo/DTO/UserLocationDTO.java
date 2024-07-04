package com.bluetech.shopNgo.DTO;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class UserLocationDTO {
    private String id; // Unique identifier for the location
    private Double latitude;
    private Double longitude;
    private String city;
    private String address;
    private String moreInfo;
    private String type; // New field for location type (e.g., Home, Work)
}
