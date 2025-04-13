package com.example.rickandmortynewsfeed.service;

import com.example.rickandmortynewsfeed.entity.Location;
import com.example.rickandmortynewsfeed.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    @Autowired
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public Location saveLocation(Location location) {
        return locationRepository.save(location);
    }
}

