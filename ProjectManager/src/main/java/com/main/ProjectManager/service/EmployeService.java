package com.main.ProjectManager.service;

import com.main.ProjectManager.data.EmployeRepository;
import com.main.ProjectManager.data.Employer;
import com.main.ProjectManager.dto.EmployerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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
                    employer.getEmpId(),
                    employer.getFirstName(),
                    employer.getLastName(),
                    employer.getProfilePic(),
                    employer.getPosition(),
                    employer.getAddress(),
                    employer.getPhoneNumber()
            );
        }
        return null;
    }

    public void retriveEmploye(String empId, String firstName, String lastName, String position ){

    }
    public Employer updateProfilePicture(String empId, MultipartFile file) throws IOException {
        Optional<Employer> employerOpt = employeRepository.findById(empId);
        if (employerOpt.isPresent()) {
            Employer employer = employerOpt.get();
            employer.setProfilePic(file.getBytes());
            return employeRepository.save(employer);
        }
        return null;
    }

    // Method to update other details of an employer
    public Employer updateEmployerDetails(String empId, String firstName, String lastName, String position) {
        Optional<Employer> employerOpt = employeRepository.findById(empId);
        if (employerOpt.isPresent()) {
            Employer employer = employerOpt.get();
            employer.setFirstName(firstName);
            employer.setLastName(lastName);
            employer.setPosition(position);
            return employeRepository.save(employer);
        }
        return null;
    }


}

