package com.example.userregistration.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "registrations")
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 80)
    @Column(nullable = false, length = 80)
    private String firstName;

    @NotBlank
    @Size(max = 80)
    @Column(nullable = false, length = 80)
    private String lastName;

    @NotBlank
    @Email
    @Size(max = 160)
    @Column(nullable = false, unique = true, length = 160)
    private String email;

    @NotBlank
    @Size(max = 30)
    @Column(nullable = false, length = 30)
    private String phone;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String course;

    @Column(nullable = false, updatable = false)
    private LocalDateTime registeredAt;

    @PrePersist
    void setRegisteredAt() {
        if (registeredAt == null) {
            registeredAt = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }
}
