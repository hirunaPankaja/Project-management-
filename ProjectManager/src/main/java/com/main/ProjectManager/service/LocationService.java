package com.main.ProjectManager.service;

import com.main.ProjectManager.data.Employer;
import com.main.ProjectManager.data.LocationRepository;
import com.main.ProjectManager.data.Locations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {
@Autowired
    private LocationRepository locationRepository;
    public Locations createLocation (Locations locations){return locationRepository.save(locations); }
    public List<Locations> getAllLocations (){return locationRepository.findAll();}
    public Locations updateLocationDetails (int locationId, double longitude, double latitude, String details, String locationType){
        Optional<Locations> locationOpt = locationRepository.findById(locationId);
        if(locationOpt.isPresent()) {
            Locations locations = locationOpt.get();
            locations.setLongitude(longitude);
            locations.setLatitude(latitude);
            locations.setLocationType(locationType);
            locations.setDetails(details);
            return locationRepository.save(locations);
        }
        return null;
        }
    }


