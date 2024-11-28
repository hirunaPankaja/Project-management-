package com.main.ProjectManager.controller;

import com.main.ProjectManager.data.Vendor;
import com.main.ProjectManager.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api2")
public class VendorController {
    @Autowired
    private VendorService vendorService;
    @PostMapping(path = "/vendor")
    public Vendor createVendor(@RequestBody Vendor vendor) {return vendorService.createVendor(vendor);}
    @GetMapping(path = "/vendor")
    public List<Vendor> getVendors(){return vendorService.getAllVendors();}
    @DeleteMapping(path = "/{vendorId}")
    public void deleteVendor(@PathVariable String vendorId){vendorService.removeVendorById(vendorId);}
    @PutMapping(path = "/{vendorId}")
    public Vendor updateVendor(@PathVariable String vendorId, @RequestBody Vendor updatedVendor){
        return vendorService.updateVendor(vendorId, updatedVendor);
    }
}
