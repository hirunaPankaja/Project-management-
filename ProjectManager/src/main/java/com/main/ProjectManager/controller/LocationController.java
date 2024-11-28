package com.main.ProjectManager.controller;

import com.main.ProjectManager.data.Locations;
import com.main.ProjectManager.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api3")
public class LocationController {
    @Autowired
    private LocationService locationService;

    @PostMapping(path = "/location")
    public Locations createLocation(@RequestParam Locations locations){return locationService.createLocation(locations);}

    @GetMapping(path = "/location")
    public List<Locations>getLocations(){return locationService.getAllLocations();}

    @PutMapping(path = "/location/{locationId}")
    public ResponseEntity<?> updateLocationDetails(@PathVariable int locationId, @RequestBody Map<String , Object> updates){
        double longitude = Double.parseDouble(updates.get("longitude").toString());
        double latitude = Double.parseDouble(updates.get("latitude").toString());
        String details = updates.get("details").toString();
        String locationType = updates.get("locationType").toString();

        Locations updatedLocation = locationService.updateLocationDetails(locationId, longitude, latitude, details, locationType);
        if(updatedLocation != null){
            return ResponseEntity.ok(updatedLocation);
        }else{
            return ResponseEntity.status(404).body(Map.of("error","Location not Found"));
        }
    }

}
