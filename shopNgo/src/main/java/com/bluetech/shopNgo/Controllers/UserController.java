package com.bluetech.shopNgo.Controllers;

import com.bluetech.shopNgo.DTO.PasswordChangeRequest;
import com.bluetech.shopNgo.DTO.UserLocationDTO;
import com.bluetech.shopNgo.Database.UserRepository;
import com.bluetech.shopNgo.Exceptions.ResourceNotFoundException;
import com.bluetech.shopNgo.Models.User;
import com.bluetech.shopNgo.Security.JWT.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.beans.Encoder;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

        // Assign a unique ID to the location
        locationDto.setId(UUID.randomUUID().toString());

        List<UserLocationDTO> locations = user.getLocations();
        locations.add(locationDto);
        user.setLocations(locations);

        userRepository.save(user);
        return ResponseEntity.ok(locationDto);
    }

    @PutMapping("/location/{id}")
    public ResponseEntity<?> updateUserLocation(@PathVariable Long id, @RequestBody UserLocationDTO locationDto, @RequestParam int index) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with Id " + id + " was not found"));

        List<UserLocationDTO> locations = user.getLocations();
        if (index >= 0 && index < locations.size()) {
            locationDto.setId(locations.get(index).getId()); // Preserve the original ID
            locations.set(index, locationDto);
            user.setLocations(locations);
            userRepository.save(user);
        } else {
            throw new ResourceNotFoundException("Location index out of bounds");
        }

        return ResponseEntity.ok(locationDto);
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

    @PutMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestHeader("Authorization") String token, @RequestBody PasswordChangeRequest passwordChangeRequest) {
        // Decode JWT token to get user details
        String username = jwtUtils.getUserNameFromJwtToken(token.substring(7));
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Check if the old password matches
        if (!passwordEncoder.matches(passwordChangeRequest.getOldPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect current password");
        }

        // Update the password
        user.setPassword(passwordEncoder.encode(passwordChangeRequest.getNewPassword()));
        userRepository.save(user);

        return ResponseEntity.ok("Password updated successfully");
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User with Id " + id + " was not found"));
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
