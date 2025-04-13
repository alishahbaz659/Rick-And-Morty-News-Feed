package com.example.rickandmortynewsfeed.service;

import com.example.rickandmortynewsfeed.entity.Episode;
import com.example.rickandmortynewsfeed.repository.EpisodeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EpisodeService {

    private final EpisodeRepository episodeRepository;

    public EpisodeService(EpisodeRepository episodeRepository) {
        this.episodeRepository = episodeRepository;
    }

    @Transactional
    public Episode saveEpisode(Episode episode) {
        // For existing episodes, preserve characters list if not provided
        if (episode.getId() != null && episode.getCharacters() == null) {
            episodeRepository.findById(episode.getId()).ifPresent(existingEpisode -> {
                episode.setCharacters(existingEpisode.getCharacters());
            });
        }
        return episodeRepository.save(episode);
    }

    public Episode findByUrl(String url) {
        return episodeRepository.findByUrl(url);
    }
}
