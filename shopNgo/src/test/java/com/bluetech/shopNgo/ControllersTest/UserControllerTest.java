package com.bluetech.shopNgo.ControllersTest;


import com.bluetech.shopNgo.Controllers.UserController;
import com.bluetech.shopNgo.Database.UserRepository;
import com.bluetech.shopNgo.Exceptions.ResourceNotFoundException;
import com.bluetech.shopNgo.Models.User;
import com.bluetech.shopNgo.Security.JWT.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private Authentication authentication;

    @Mock
    private UserDetails userDetails;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetCurrentUser_Success() {
        // Arrange
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userDetails.getUsername()).thenReturn("testUser");
        User mockUser = new User();
        mockUser.setUsername("testUser");
        mockUser.setEmail("testUser@example.com");
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(mockUser));

        // Act
        ResponseEntity<User> response = userController.getCurrentUser(authentication);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("testUser", response.getBody().getUsername());
        assertEquals("testUser@example.com", response.getBody().getEmail());

        // Verify interactions
        verify(userRepository, times(1)).findByUsername("testUser");
    }

    @Test
    public void testGetCurrentUser_UserNotAuthenticated() {
        // Arrange
        when(authentication.getPrincipal()).thenReturn(null);

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            userController.getCurrentUser(authentication);
        });
    }

    @Test
    public void testGetCurrentUser_UserNotFound() {
        // Arrange
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userDetails.getUsername()).thenReturn("testUser");
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            userController.getCurrentUser(authentication);
        });
    }
}
