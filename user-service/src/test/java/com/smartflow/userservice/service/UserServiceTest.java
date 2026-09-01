package com.smartflow.userservice.service;

import com.smartflow.userservice.config.JwtTokenProvider;
import com.smartflow.userservice.dto.AuthResponse;
import com.smartflow.userservice.dto.LoginRequest;
import com.smartflow.userservice.dto.RegisterRequest;
import com.smartflow.userservice.entity.Role;
import com.smartflow.userservice.entity.User;
import com.smartflow.userservice.exception.DuplicateResourceException;
import com.smartflow.userservice.exception.InvalidCredentialsException;
import com.smartflow.userservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider tokenProvider;

    @InjectMocks
    private UserServiceImpl userService;

    private RegisterRequest registerRequest;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest("Rajesh Patil", "rajesh@example.com", "password123", Role.DEVELOPER, "Backend Team");
    }

    @Test
    void register_Success() {
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        User user = new User();
        user.setId(1L);
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setRole(registerRequest.getRole());
        user.setTeam(registerRequest.getTeam());

        when(userRepository.save(any(User.class))).thenReturn(user);
        when(tokenProvider.generateToken(anyString(), anyString())).thenReturn("jwt-token");

        AuthResponse response = userService.register(registerRequest);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals("Rajesh Patil", response.getUser().getName());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void register_DuplicateEmail_ThrowsException() {
        when(userRepository.existsByEmail(anyString())).thenReturn(true);
        assertThrows(DuplicateResourceException.class, () -> userService.register(registerRequest));
    }

    @Test
    void login_InvalidCredentials_ThrowsException() {
        LoginRequest loginRequest = new LoginRequest("rajesh@example.com", "wrongpass");
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        assertThrows(InvalidCredentialsException.class, () -> userService.login(loginRequest));
    }
}
