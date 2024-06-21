// Package declaration
package com.bluetech.shopNgo.DTO.Request;

// Import statements for validation constraints
import com.bluetech.shopNgo.DTO.UserLocationDTO;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Set;

// Definition of the SignupRequest class
public class SignupRequest {
    // A username field that must not be blank and must be between 3 and 20 characters
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    // An email field that must not be blank, must be a valid email, and its length must be 50 characters or less
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    // A Set to hold roles. It doesn't have validation annotations, meaning it can be null or empty
    private Set<String> role;

    // A password field that must not be blank and must be between 6 and 40 characters
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    // A phoneNumber field that must not be blank and must be exactly 10 characters
    @NotBlank
    @Size(min = 10, max = 10)
    private String phoneNumber;

    // Two Double fields for latitude and longitude with no validation constraints
    private Double latitude;
    private Double longitude;

    private String city;
    private String street;
    @Size(min = 0 , max = 50)
    private String moreInfo;

    // Getter and setter methods for latitude
    public Double getLatitude() {
        return latitude;
    }
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    // Getter and setter methods for longitude
    public Double getLongitude() {
        return longitude;
    }
    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
    public void setCity(String city){
        this.city = city;
    }
    public String getCity(){
        return city;
    }

    public void setStreet(String street){
        this.street = street;
    }
    public String getStreet(){
        return street;
    }
    public void setMoreInfo(String moreInfo){
        this.moreInfo = moreInfo;
    }

    public String getMoreInfo() {
        return moreInfo;
    }

    // Getter and setter methods for phoneNumber
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    // Getter and setter methods for username
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    // Getter and setter methods for email
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    // Getter and setter methods for password
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    // Getter and setter methods for role
    public Set<String> getRole() {
        return this.role;
    }
    public void setRole(Set<String> role) {
        this.role = role;
    }

    // Method to get the location data as a UserLocationDto object
    public UserLocationDTO getLocation() {
        UserLocationDTO location = new UserLocationDTO();
        location.setLatitude(this.latitude);
        location.setLongitude(this.longitude);
        location.setCity(this.city);
        location.setAddress(this.street);
        location.setMoreInfo(this.moreInfo);
        return location;
    }
}
