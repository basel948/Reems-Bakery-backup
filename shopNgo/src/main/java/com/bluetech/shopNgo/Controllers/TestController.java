package com.bluetech.shopNgo.Controllers;

// Import statements
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // Marks this class as a controller where every method returns a domain object instead of a view
@RequestMapping("/api/auth/test") // Maps HTTP requests to handler methods of MVC and REST controllers (base path for all methods in this controller)
public class TestController {

    // GET endpoint for all users (public access)
    @GetMapping("/all")
    public String allAccess(){
        // This method can be accessed by anyone without authentication
        return "Public Content";
    }

    // GET endpoint for users with USER or ADMIN roles
    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')") // Method-level security; method can only be called if the authenticated user has USER or ADMIN role
    public String userAccess(){
        // This method can only be accessed by authenticated users with USER or ADMIN roles
        return "User Content";
    }

    // GET endpoint for users with ADMIN role
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')") // Method-level security; method can only be called if the authenticated user has ADMIN role
    public String adminAccess(){
        // This method can only be accessed by authenticated users with the ADMIN role
        return "Admin Board.";
    }
}
