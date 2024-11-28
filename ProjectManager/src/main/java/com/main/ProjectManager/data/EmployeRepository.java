package com.main.ProjectManager.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeRepository extends JpaRepository<Employer,String> {
    Optional<Employer> findByEmail(String email);
}