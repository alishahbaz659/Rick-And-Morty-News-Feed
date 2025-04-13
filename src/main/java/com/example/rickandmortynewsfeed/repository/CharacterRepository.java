package com.example.rickandmortynewsfeed.repository;

import com.example.rickandmortynewsfeed.entity.CharacterDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterRepository extends JpaRepository<CharacterDetails, Long> {
    Page<CharacterDetails> findByNameContainingIgnoreCase(String name, Pageable pageable);
    Page<CharacterDetails> findByStatus(String status, Pageable pageable);
    Page<CharacterDetails> findBySpecies(String species, Pageable pageable);
    Page<CharacterDetails> findByNameContainingIgnoreCaseAndStatus(String name, String status, Pageable pageable);
    Page<CharacterDetails> findByNameContainingIgnoreCaseAndSpecies(String name, String species, Pageable pageable);
    Page<CharacterDetails> findByStatusAndSpecies(String status, String species, Pageable pageable);
    Page<CharacterDetails> findByNameContainingIgnoreCaseAndStatusAndSpecies(String name, String status, String species, Pageable pageable);
}
