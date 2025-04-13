package com.example.rickandmortynewsfeed.repository;

import com.example.rickandmortynewsfeed.entity.Origin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OriginRepository extends JpaRepository<Origin, Long> {
}
