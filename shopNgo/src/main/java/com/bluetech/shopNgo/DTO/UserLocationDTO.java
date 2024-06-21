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

    private Double latitude;
    private Double longitude;
    private String city;
    private String address;
    private String moreInfo;
}
