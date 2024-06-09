package com.bluetech.shopNgo.Controllers;

import com.bluetech.shopNgo.DTO.UserLocationDTO;
import com.bluetech.shopNgo.Database.UserRepository;
import com.bluetech.shopNgo.Exceptions.ResourceNotFoundException;
import com.bluetech.shopNgo.Models.User;
import com.bluetech.shopNgo.Security.JWT.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.JsonPath;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import javax.management.RuntimeErrorException;
import java.util.List;

@RestController
@RequestMapping("/api/auth/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/currentUser")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        System.out.println("in the CurrentUser Method");
        System.out.println("Authentication: " + authentication);
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
            throw new ResourceNotFoundException("User not authenticated");
        }
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        System.out.println("Returning user: " + user);
        return ResponseEntity.ok(user);
    }


    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

//    @GetMapping("/{id}")
//    public User getUserById(@PathVariable Long id){
//        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User with Id " + id + " was not found"));
//    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "id") Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/addUser")
    public User createUser(@RequestBody User user){
        return userRepository.save(user);
    }

    @PostMapping("/location/{id}")
    public ResponseEntity<?> addLocation(@PathVariable Long id, @RequestBody UserLocationDTO locationDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with Id " + id + " was not found"));

        UserLocationDTO userLocation = user.getLocation();

        // If the user doesn't have a location, create a new UserLocationDto
        if (userLocation == null) {
            userLocation = new UserLocationDTO();
        }

        // Update specific location fields based on the provided UserLocationDto
        userLocation.setLatitude(locationDto.getLatitude());
        userLocation.setLongitude(locationDto.getLongitude());
        userLocation.setCity(locationDto.getCity());
        userLocation.setAddress(locationDto.getAddress());
        userLocation.setMoreInfo(locationDto.getMoreInfo());

        user.setLocation(userLocation); // Set the updated location back to the user
        userRepository.save(user);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/location/{id}")
    public ResponseEntity<?> updateUserLocation(@PathVariable Long id, @RequestBody UserLocationDTO locationDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with Id " + id + " was not found"));

        UserLocationDTO userLocation = user.getLocation();

        // If the user doesn't have a location, create a new UserLocationDto
        if (userLocation == null) {
            userLocation = new UserLocationDTO();
        }

        // Update specific location fields based on the provided UserLocationDto
        userLocation.setLatitude(locationDto.getLatitude());
        userLocation.setLongitude(locationDto.getLongitude());
        userLocation.setCity(locationDto.getCity());
        userLocation.setAddress(locationDto.getAddress());
        userLocation.setMoreInfo(locationDto.getMoreInfo());

        user.setLocation(userLocation); // Set the updated location back to the user
        userRepository.save(user);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/location/{id}")
    public ResponseEntity<?> removeLocation(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with Id " + id + " was not found"));

        // Set location fields to null to remove the location
        user.getLocation().setLatitude(null);
        user.getLocation().setLongitude(null);
        user.getLocation().setCity(null);
        user.getLocation().setAddress(null);
        user.getLocation().setMoreInfo(null);

        userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id , @RequestBody User userDetails){
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User with Id " + id + " was not found"));
        user.setEmail(userDetails.getEmail());
        user.setUsername(userDetails.getUsername());
       user.setPassword(userDetails.getPassword());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User with Id " + id + " was not found"));
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
