// Package declaration
package com.bluetech.shopNgo.Security.Services;

// Import statements
import com.bluetech.shopNgo.Database.UserRepository;
import com.bluetech.shopNgo.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// The @Service annotation marks this class as a service component in Spring's context
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    // Autowired UserRepository to access user data from the database
    @Autowired
    UserRepository userRepository;

    // Overridden method from UserDetailsService interface to load user details
    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        // Retrieves user from the database by username. If not found, it throws UsernameNotFoundException
        User user = userRepository.findByUsername(usernameOrEmail)
                .orElseGet(() -> userRepository.findByEmail(usernameOrEmail)
                        .orElseThrow(() -> new UsernameNotFoundException("User Not Found With Username or Email " + usernameOrEmail)));

        // Converts the retrieved User object to UserDetails object using UserDetailsImpl and returns it
        return UserDetailsImpl.build(user);
    }
}
