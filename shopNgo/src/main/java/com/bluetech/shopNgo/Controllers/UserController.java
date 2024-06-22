package com.bluetech.shopNgo.Controllers;

import com.bluetech.shopNgo.DTO.UserLocationDTO;
import com.bluetech.shopNgo.Database.UserRepository;
import com.bluetech.shopNgo.Exceptions.ResourceNotFoundException;
import com.bluetech.shopNgo.Models.User;
import com.bluetech.shopNgo.Security.JWT.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
            throw new ResourceNotFoundException("User not authenticated");
        }
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return ResponseEntity.ok(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "id") Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/addUser")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/location/{id}")
    public ResponseEntity<?> addLocation(@PathVariable Long id, @RequestBody UserLocationDTO locationDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with Id " + id + " was not found"));

        List<UserLocationDTO> locations = user.getLocations();
        locations.add(locationDto);
        user.setLocations(locations);

        userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/location/{id}")
    public ResponseEntity<?> updateUserLocation(@PathVariable Long id, @RequestBody UserLocationDTO locationDto, @RequestParam int index) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with Id " + id + " was not found"));

        List<UserLocationDTO> locations = user.getLocations();
        if (index >= 0 && index < locations.size()) {
            locations.set(index, locationDto);
            user.setLocations(locations);
            userRepository.save(user);
        } else {
            throw new ResourceNotFoundException("Location index out of bounds");
        }

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/location/{id}")
    public ResponseEntity<?> removeLocation(@PathVariable Long id, @RequestParam int index) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with Id " + id + " was not found"));

        List<UserLocationDTO> locations = user.getLocations();
        if (index >= 0 && index < locations.size()) {
            locations.remove(index);
            user.setLocations(locations);
            userRepository.save(user);
        } else {
            throw new ResourceNotFoundException("Location index out of bounds");
        }

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User with Id " + id + " was not found"));
        if(userDetails.getUsername() != null && !userDetails.getUsername().isEmpty()){
            user.setUsername(userDetails.getUsername());
        }
        if(userDetails.getEmail() != null && !userDetails.getEmail().isEmpty()){
            user.setEmail(userDetails.getEmail());
        }
        if(userDetails.getPhoneNumber() != null && !userDetails.getPhoneNumber().isEmpty()){
            user.setPhoneNumber(userDetails.getPhoneNumber());
        }
        return ResponseEntity.ok(userRepository.save(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User with Id " + id + " was not found"));
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
