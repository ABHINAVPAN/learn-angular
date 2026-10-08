package com.example.employeemanagement.service;

import com.example.employeemanagement.model.Employee;
import com.example.employeemanagement.repository.EmployeeRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Locale;

@Service
public class EmployeeService {
    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> findAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Employee findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));
    }

    public Employee create(Employee employee) {
        employee.setId(null);
        employee.setEmail(normalizeEmail(employee.getEmail()));

        if (repository.existsByEmail(employee.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Employee email already exists");
        }

        return repository.saveAndFlush(employee);
    }

    public Employee update(Long id, Employee changes) {
        Employee employee = findById(id);
        String email = normalizeEmail(changes.getEmail());
        if (!employee.getEmail().equalsIgnoreCase(email) && repository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Employee email already exists");
        }

        employee.setFirstName(changes.getFirstName());
        employee.setLastName(changes.getLastName());
        employee.setEmail(email);
        employee.setDepartment(changes.getDepartment());
        employee.setPosition(changes.getPosition());
        employee.setSalary(changes.getSalary());
        employee.setStatus(changes.getStatus());
        employee.setHireDate(changes.getHireDate());

        return repository.saveAndFlush(employee);
    }

    public void delete(Long id) {
        repository.delete(findById(id));
    }

    private String normalizeEmail(String email) {
        return email == null ? "" : email.trim().toLowerCase(Locale.ROOT);
    }
}
