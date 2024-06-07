//// Package declaration
//package com.bluetech.shopNgo.Security.JWT;
//
//// Import statements
//import com.bluetech.shopNgo.Security.Services.UserDetailsImpl;
//import io.jsonwebtoken.*;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.security.Keys;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.Authentication;
//import org.springframework.stereotype.Component;
//
//import java.security.Key;
//import java.util.Date;
//
//// Marks this class as a Spring Component
//@Component
//public class JwtUtils {
//
//    // Logger for logging errors and information
//    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
//
//    // Injects 'jwtSecret' from the application properties
//    @Value("${auth.app.jwtSecret}")
//    private String jwtSecret;
//
//    // Injects 'jwtExpirationMs' from the application properties
//    @Value("${auth.app.jwtExpirationMs}")
//    private int jwtExpirationMs;
//
//    // Method to generate a JWT token string based on the authentication object
//    public String generateJwtTokenString(Authentication authentication) {
//
//        // Casts authentication principal to UserDetailsImpl
//        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
//
//        // Builds a JWT token using JJWT library
//        return Jwts.builder()
//                .setSubject((userPrincipal.getUsername())) // Sets the subject as the username
//                .setIssuedAt(new Date()) // Sets the issued date to current date
//                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)) // Sets the expiration date
//                .signWith(key(), SignatureAlgorithm.HS256) // Signs the token with the secret key and algorithm
//                .compact(); // Compacts it into the final String form
//    }
//
//    // Private helper method to generate a key from the jwtSecret
//    private Key key() {
//        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
//    }
//
//    // Method to extract the username from the JWT token
//    public String getUserNameFromJwtToken(String token) {
//            return Jwts.parserBuilder().setSigningKey(key()).build()
//                    .parseClaimsJws(token).getBody().getSubject();
//    }
//
//    // Method to validate the JWT token
//    public boolean validateJwtToken(String authToken) {
//        try {
//            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken); // Attempts to parse the token
//            return true; // Returns true if successful
//        } catch (MalformedJwtException e) {
//            logger.error("Invalid JWT token: {}", e.getMessage()); // Logs malformed JWT token errors
//        } catch (ExpiredJwtException e) {
//            logger.error("JWT token is expired: {}", e.getMessage()); // Logs expired JWT token errors
//        } catch (UnsupportedJwtException e) {
//            logger.error("JWT token is unsupported: {}", e.getMessage()); // Logs unsupported JWT token errors
//        } catch (IllegalArgumentException e) {
//            logger.error("JWT claims string is empty: {}", e.getMessage()); // Logs illegal argument errors
//        }
//
//        return false; // Returns false if validation fails
//    }
//
//}


package com.bluetech.shopNgo.Security.JWT;

import com.bluetech.shopNgo.Security.Services.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${auth.app.jwtSecret}")
    private String jwtSecret;

    @Value("${auth.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }

    public Date getExpirationDateFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getExpiration();
    }

}
