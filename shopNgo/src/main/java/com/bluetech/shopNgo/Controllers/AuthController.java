package com.bluetech.shopNgo.Controllers;

// Import statements are omitted for brevity
import com.bluetech.shopNgo.DTO.Request.SignInRequest;
import com.bluetech.shopNgo.DTO.Request.SignupRequest;
import com.bluetech.shopNgo.DTO.Response.JwtResponse;
import com.bluetech.shopNgo.Database.RoleRepository;
import com.bluetech.shopNgo.Database.UserRepository;
import com.bluetech.shopNgo.Models.ERole;
import com.bluetech.shopNgo.Models.Role;
import com.bluetech.shopNgo.Models.User;
import com.bluetech.shopNgo.DTO.Response.MessageResponse;
import com.bluetech.shopNgo.Security.JWT.JwtUtils;
import com.bluetech.shopNgo.Security.Services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@RestController // Marks this class as a REST controller
@RequestMapping("/api/auth") // Maps requests to /api/auth path
public class AuthController {

    // Field injections for various components used in this controller
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;

    // POST endpoint for signing in a user
    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody SignInRequest signInRequest){
        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword()));

        // Set the authentication in the security context
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // Generate JWT token for authenticated user
        String jwt = jwtUtils.generateJwtTokenString(authentication);

        // Get UserDetails from the authentication object
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        // Extract roles from UserDetails and convert to List<String>
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        // Return JWT response including token and user details
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    // POST endpoint for registering a new user
    @PostMapping("/signup")
    public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        // Check if username exists
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        // Check if email exists
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }


        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()), // Encode the password
                signUpRequest.getPhoneNumber(),
                signUpRequest.getLocation() // Use signUpRequest.getLocation() directly
        );

        // Process roles
        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user); // Save the user

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
