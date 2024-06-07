//// Package declaration
//package com.bluetech.shopNgo.DTO.Request;
//
//// Import statement for the NotBlank annotation
//import jakarta.validation.constraints.NotBlank;
//
//// Definition of the SignInRequest class
//public class SignInRequest {
//    // Annotation to ensure the username field is not blank in the request
//    @NotBlank
//    private String username; // Declares a private field 'username'
//
//    // Annotation to ensure the password field is not blank in the request
//    @NotBlank
//    private String password; // Declares a private field 'password'
//
//    // Public getter method for username
//    public String getUsername() {
//        return username; // Returns the value of the username field
//    }
//
//    // Public setter method for username
//    public void setUsername(String username) {
//        this.username = username; // Sets the value of the username field
//    }
//
//    // Public getter method for password
//    public String getPassword() {
//        return password; // Returns the value of the password field
//    }
//
//    // Public setter method for password
//    public void setPassword(String password) {
//        this.password = password; // Sets the value of the password field
//    }
//
//}


package com.bluetech.shopNgo.DTO.Request;

import jakarta.validation.constraints.NotBlank;

public class SignInRequest {
    @NotBlank
    private String login; // This can be either username or email

    @NotBlank
    private String password;

    // Getters and Setters
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
