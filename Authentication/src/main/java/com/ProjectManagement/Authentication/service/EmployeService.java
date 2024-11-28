package com.ProjectManagement.Authentication.service;

import com.ProjectManagement.Authentication.data.EmployeRepository;
import com.ProjectManagement.Authentication.data.Employer;
import com.ProjectManagement.Authentication.dto.EmployerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeService {
     @Autowired
    private EmployeRepository employeRepository;

     public Employer createEmployer(Employer employer) {
         return employeRepository.save(employer);
     }

     public List<Employer> getAllEmployers() {
         return employeRepository.findAll();
     }
    public Employer getEmployerByEmail(String email) {
        return employeRepository.findByEmail(email).orElse(null);
    }

    public void updatePassword(String email, String newPassword) {
        Employer employer = getEmployerByEmail(email);
        if (employer != null) {
            employer.setPassword(newPassword);
            employeRepository.save(employer);
        }
    }

    public EmployerDTO login(String email, String password) {
        Employer employer = employeRepository.findByEmail(email).orElse(null);

        if (employer != null && employer.getPassword().equals(password)) {
            return new EmployerDTO(
                    employer.getFirstName(),
                    employer.getLastName(),
                    employer.getProfilePic(),
                    employer.getPosition()
            );
        }
        return null;
    }

}
