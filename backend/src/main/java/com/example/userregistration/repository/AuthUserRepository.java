package com.example.userregistration.repository;

import com.example.userregistration.model.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthUserRepository extends JpaRepository<AuthUser, Long> {
    Optional<AuthUser> findByEmail(String email);
    boolean existsByEmail(String email);
}