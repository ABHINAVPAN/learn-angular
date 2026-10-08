package com.example.employeemanagement.auth;

import com.example.employeemanagement.model.AuthUser;
import com.example.employeemanagement.repository.AuthUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Locale;

@Service
public class AuthService {
    private final AuthUserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(AuthUserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = normalizeEmail(request.email());
        if (repository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Account already exists.");
        }

        repository.save(new AuthUser(email, passwordEncoder.encode(request.password())));
        return new AuthResponse(jwtService.createToken(email), email);
    }

    public AuthResponse login(LoginRequest request) {
        String email = normalizeEmail(request.email());
        AuthUser user = repository.findByEmail(email)
                .filter(account -> passwordEncoder.matches(request.password(), account.getPasswordHash()))
                .orElseThrow(() -> new IllegalArgumentException("Email or password is incorrect."));

        return new AuthResponse(jwtService.createToken(user.getEmail()), user.getEmail());
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
