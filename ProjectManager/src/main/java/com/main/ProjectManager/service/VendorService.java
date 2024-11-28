package com.main.ProjectManager.service;

import com.main.ProjectManager.data.Employer;
import com.main.ProjectManager.data.Vendor;
import com.main.ProjectManager.data.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendorService {
 @Autowired
 private VendorRepository vendorRepository;

    public Vendor createVendor(Vendor vendor) { return vendorRepository.save(vendor);}
    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }
    public void removeVendorById(String vendorId){ vendorRepository.deleteById(vendorId);}


    public Vendor updateVendor(String vendorId, Vendor updatedVendor) {
        Optional<Vendor> existingVendorOpt = vendorRepository.findById(vendorId);
        if (existingVendorOpt.isPresent()) {
            Vendor existingVendor = existingVendorOpt.get();

            existingVendor.setName(updatedVendor.getName());
            existingVendor.setVendorId(updatedVendor.getVendorId());
            existingVendor.setType(updatedVendor.getType());
            existingVendor.setPhone(updatedVendor.getPhone());
            existingVendor.setCharge(updatedVendor.getCharge());

            return vendorRepository.save(existingVendor);
        }
        return null;
    }
}
