package com.main.ProjectManager.data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "vendors")
@Entity
public class Vendor {
    @Id
    @Column(name = "vendor_id")
    private String vendorId;

    @Column(name = "vendor_name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "phone_number")
    private String phone;

    @Column(name = "day_charge")
    private String charge;


}
