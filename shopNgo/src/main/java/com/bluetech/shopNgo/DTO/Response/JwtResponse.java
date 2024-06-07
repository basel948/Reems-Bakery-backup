//package com.bluetech.shopNgo.DTO.Response;
//
//import java.util.List;
//
//public class JwtResponse {
//    private String token;
//    private String type = "Bearer";
//    private Long id;
//    private String username;
//    private String email;
//    private List<String> roles;
//
//    public JwtResponse(String accessToken, Long id, String username, String email, List<String> roles) {
//        this.token = accessToken;
//        this.id = id;
//        this.username = username;
//        this.email = email;
//        this.roles = roles;
//    }
//
//    public String getAccessToken() {
//        return token;
//    }
//
//    public void setAccessToken(String accessToken) {
//        this.token = accessToken;
//    }
//
//    public String getTokenType() {
//        return type;
//    }
//
//    public void setTokenType(String tokenType) {
//        this.type = tokenType;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public List<String> getRoles() {
//        return roles;
//    }
//
//}

package com.bluetech.shopNgo.DTO.Response;

import com.bluetech.shopNgo.DTO.UserLocationDTO;

import java.util.Date;
import java.util.List;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String phoneNumber;
    private UserLocationDTO location;
    private List<String> roles;
    private Date expirationTime;


    public JwtResponse(String accessToken, Long id, String username, String email, String phoneNumber, UserLocationDTO location, List<String> roles , Date expirationTime) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.location = location;
        this.roles = roles;
        this.expirationTime = expirationTime;
    }

    // Getters and setters
    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public UserLocationDTO getLocation() {
        return location;
    }

    public void setLocation(UserLocationDTO location) {
        this.location = location;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public Date getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(Date expirationTime) {
        this.expirationTime = expirationTime;
    }

}
