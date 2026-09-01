package com.smartflow.userservice.service;

import com.smartflow.userservice.dto.AuthResponse;
import com.smartflow.userservice.dto.LoginRequest;
import com.smartflow.userservice.dto.RegisterRequest;
import com.smartflow.userservice.dto.UserDto;

import java.util.List;

public interface UserService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    List<UserDto> getAllUsers();
    UserDto getUserById(Long id);
    UserDto updateUser(Long id, RegisterRequest request);
    void deleteUser(Long id);
}
