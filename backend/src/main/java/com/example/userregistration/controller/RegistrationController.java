package com.example.userregistration.controller;

import com.example.userregistration.model.Registration;
import com.example.userregistration.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationService service;

    public RegistrationController(RegistrationService service) {
        this.service = service;
    }

    @GetMapping
    public List<Registration> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Registration findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Registration create(@Valid @RequestBody Registration registration) {
        return service.create(registration);
    }

    @PutMapping("/{id}")
    public Registration update(@PathVariable Long id, @Valid @RequestBody Registration registration) {
        return service.update(id, registration);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
