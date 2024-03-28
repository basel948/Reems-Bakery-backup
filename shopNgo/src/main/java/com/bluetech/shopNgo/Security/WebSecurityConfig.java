// Package declaration
package com.bluetech.shopNgo.Security;

// Import statements
import com.bluetech.shopNgo.Security.JWT.AuthEntryPointJwt;
import com.bluetech.shopNgo.Security.JWT.AuthTokenFilter;
import com.bluetech.shopNgo.Security.Services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// Indicates that this class is a configuration class
@Configuration
// Enables method-level security annotations
@EnableMethodSecurity
public class WebSecurityConfig{

    // Autowiring the custom UserDetailsService
    @Autowired
    UserDetailsServiceImpl userDetailsService;
    // Autowiring the Authentication Entry Point for unauthorized requests
    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    // Bean for JWT Authentication Token Filter
    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    // Authentication provider bean using DAO Authentication Provider
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    // Bean to configure the AuthenticationManager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
    // Bean for Password Encoder, using BCrypt hashing algorithm
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Bean for configuring security filter chain
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disabling CSRF protection
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers("/api/auth/**").permitAll() // Permitting all requests to /api/auth/**
                                .requestMatchers("/api/test/**").permitAll() // Permitting all requests to /api/test/**
                                .anyRequest().authenticated() // Any other request must be authenticated
                )
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler)) // Custom handling for unauthorized requests
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // Setting session management to stateless

        http.authenticationProvider(authenticationProvider()); // Adding the authentication provider

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class); // Adding the JWT filter

        return http.build(); // Building the security filter chain
    }
}
