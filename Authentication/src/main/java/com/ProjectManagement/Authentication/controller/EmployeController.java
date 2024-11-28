package com.ProjectManagement.Authentication.controller;

import com.ProjectManagement.Authentication.data.Employer;
import com.ProjectManagement.Authentication.dto.EmployerDTO;
import com.ProjectManagement.Authentication.service.EmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class EmployeController {

    @Autowired
    private EmployeService employeService;

    // Endpoint to create a new employee (employer)
    @PostMapping(path = "/employee")
    public Employer createEmployee(@RequestBody Employer employer) {
        return employeService.createEmployer(employer);
    }

    // Endpoint to get all employees
    @GetMapping(path = "/employee")
    public List<Employer> getEmployees() {
        return employeService.getAllEmployers();
    }

    //Endpoint to verify a user
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        EmployerDTO employerDTO = employeService.login(email, password);

        if (employerDTO != null) {
            return ResponseEntity.ok(employerDTO);
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
        }
    }

}
