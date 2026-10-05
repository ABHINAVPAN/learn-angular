package com.example.userregistration.service;

import com.example.userregistration.model.Registration;
import com.example.userregistration.repository.RegistrationRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RegistrationService {

    private final RegistrationRepository repository;

    public RegistrationService(RegistrationRepository repository) {
        this.repository = repository;
    }

    public List<Registration> findAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "registeredAt"));
    }

    public Registration findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Registration not found"));
    }

    public Registration create(Registration registration) {
        registration.setId(null);
        return repository.saveAndFlush(registration);
    }

    public Registration update(Long id, Registration changes) {
        Registration registration = findById(id);
        registration.setFirstName(changes.getFirstName());
        registration.setLastName(changes.getLastName());
        registration.setEmail(changes.getEmail());
        registration.setPhone(changes.getPhone());
        registration.setCourse(changes.getCourse());
        return repository.saveAndFlush(registration);
    }

    public void delete(Long id) {
        repository.delete(findById(id));
    }
}
