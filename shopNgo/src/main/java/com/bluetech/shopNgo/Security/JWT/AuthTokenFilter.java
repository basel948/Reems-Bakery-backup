//// Package declaration
//package com.bluetech.shopNgo.Security.JWT;
//
//// Import statements
//import com.bluetech.shopNgo.Security.Services.UserDetailsServiceImpl;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.util.StringUtils;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//// Extends OncePerRequestFilter to ensure this logic is applied once per request
//public class AuthTokenFilter extends OncePerRequestFilter {
//
//    // Autowired to inject dependencies
//    @Autowired
//    private JwtUtils jwtUtils;
//
//    @Autowired
//    private UserDetailsServiceImpl userDetailsService;
//
//    // Logger for logging errors
//    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);
//
//    // Method that is executed for each request to filter
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        try {
//            // Extract JWT from request
//            String jwt = parseJwt(request);
//            // If JWT is valid
//            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
//                // Get username from token
//                String username = jwtUtils.getUserNameFromJwtToken(jwt);
//
//                // Load user details
//                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//                // Create authentication token with user details
//                UsernamePasswordAuthenticationToken authentication =
//                        new UsernamePasswordAuthenticationToken(
//                                userDetails,
//                                null,
//                                userDetails.getAuthorities());
//                // Set details from the request to the authentication token
//                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//                // Set authentication in the security context
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//        } catch (Exception e) {
//            // Log errors during authentication
//            logger.error("Cannot set user authentication: {}", e);
//        }
//
//        // Proceed with the filter chain
//        filterChain.doFilter(request, response);
//    }
//
//    // Method to extract JWT token from the request header
//    private String parseJwt(HttpServletRequest request) {
//        // Get the 'Authorization' header from the request
//        String headerAuth = request.getHeader("Authorization");
//
//        // Check if the header is present and starts with 'Bearer '
//        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
//            // Extract and return the token (substring after "Bearer ")
//            return headerAuth.substring(7);
//        }
//
//        return null; // Return null if the token is not present or not in the correct format
//    }
//}

package com.bluetech.shopNgo.Security.JWT;

import com.bluetech.shopNgo.Security.Services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);
            logger.info("JWT Token: {}", jwt);

            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                String username = jwtUtils.getUserNameFromJwtToken(jwt);
                logger.info("Username from JWT: {}", username);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
                logger.info("Authentication set in security context");
            } else {
                logger.info("JWT token is invalid or null.");
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }

        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        logger.info("Authorization Header: {}", headerAuth);

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }

        return null;
    }
}
