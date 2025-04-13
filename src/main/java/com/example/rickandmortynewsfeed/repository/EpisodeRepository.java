package com.example.rickandmortynewsfeed.repository;

import com.example.rickandmortynewsfeed.entity.Episode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EpisodeRepository extends JpaRepository<Episode, Long> {
    Episode findByUrl(String url);
}
