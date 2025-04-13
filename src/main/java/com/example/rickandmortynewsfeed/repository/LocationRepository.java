package com.example.rickandmortynewsfeed.repository;

import com.example.rickandmortynewsfeed.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
}
