package com.example.rickandmortynewsfeed.service;

import com.example.rickandmortynewsfeed.entity.Origin;
import com.example.rickandmortynewsfeed.repository.OriginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OriginService {

    private final OriginRepository originRepository;

    @Autowired
    public OriginService(OriginRepository originRepository) {
        this.originRepository = originRepository;
    }

    public Origin saveOrigin(Origin origin) {
        return originRepository.save(origin);
    }
}
