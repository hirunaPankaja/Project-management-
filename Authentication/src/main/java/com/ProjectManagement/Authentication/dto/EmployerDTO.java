package com.ProjectManagement.Authentication.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EmployerDTO {

        private String firstName;
        private String lastName;
        private byte[] profilePic;
        private String position;
}

