// Package declaration
package com.bluetech.shopNgo.Security.JWT;

// Import statements
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

// Declares this class as a Spring Component
@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    // Logger to log error messages
    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    // Method that gets triggered when an unauthenticated user tries to access a secured resource
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

        // Log the error message
        logger.error("Unauthorized error: {}", authException.getMessage());

        // Set the content type of the response to JSON
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        // Set the HTTP status code to 401 (Unauthorized)
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // Creating a map to hold the error details
        final Map<String,Object> body = new HashMap<>();
        body.put("status", HttpServletResponse.SC_UNAUTHORIZED); // Add HTTP status to the map
        body.put("ERROR", "Unauthorized"); // Add a custom error message
        body.put("message", authException.getMessage()); // Add the exception message
        body.put("path", request.getServletPath()); // Add the servlet path (URL) where the error occurred

        // Instantiate an ObjectMapper to write the map as a JSON string
        final ObjectMapper mapper = new ObjectMapper();
        // Write the map to the response's output stream, converting it to JSON
        mapper.writeValue(response.getOutputStream(), body);
    }
}
