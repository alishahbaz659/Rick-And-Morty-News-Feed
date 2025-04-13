package com.example.rickandmortynewsfeed.service;

import com.example.rickandmortynewsfeed.entity.CharacterDetails;
import com.example.rickandmortynewsfeed.entity.Episode;
import com.example.rickandmortynewsfeed.entity.Location;
import com.example.rickandmortynewsfeed.entity.Origin;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RickAndMortyApiService {

    private final RestTemplate restTemplate;
    private final CharacterService characterService;
    private final EpisodeService episodeService;
    private final OriginService originService;
    private final LocationService locationService;

    private final String BASE_URL = "https://rickandmortyapi.com/api";
    private final String CHARACTER_ENDPOINT = "/character";
    private final String EPISODE_ENDPOINT = "/episode";

    @Autowired
    public RickAndMortyApiService(RestTemplateBuilder restTemplateBuilder, CharacterService characterService, EpisodeService episodeService, OriginService originService, LocationService locationService) {
        this.restTemplate = restTemplateBuilder.build();
        this.characterService = characterService;
        this.episodeService = episodeService;
        this.originService = originService;
        this.locationService = locationService;
    }

    public void fetchAndSaveCharacters(int page) {
        boolean hasNextPage = true;
        int currentPage = page;

        while (hasNextPage) {
            String url = BASE_URL + CHARACTER_ENDPOINT + "?page=" + currentPage;
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                List<Map<String, Object>> results = (List<Map<String, Object>>) response.getBody().get("results");

                if (results != null) {
                    for (Map<String, Object> characterData : results) {
                        CharacterDetails characterDetails = mapCharacterData(characterData);
                        characterService.saveCharacter(characterDetails);
                    }
                }

                Map<String, Object> info = (Map<String, Object>) response.getBody().get("info");
                String nextPageUrl = (String) info.get("next");

                if (nextPageUrl != null) {
                    currentPage = Integer.parseInt(nextPageUrl.substring(nextPageUrl.indexOf("page=") + 5));
                } else {
                    hasNextPage = false;
                }
            } else {
                System.err.println("Failed to fetch characters from page " + currentPage + ": " + response.getStatusCode());
                hasNextPage = false;
            }
        }
    }

    public CharacterDetails mapCharacterData(Map<String, Object> data) {
        CharacterDetails characterDetails = new CharacterDetails();
        characterDetails.setId(((Number) data.get("id")).longValue());
        characterDetails.setName((String) data.get("name"));
        characterDetails.setStatus((String) data.get("status"));
        characterDetails.setSpecies((String) data.get("species"));
        characterDetails.setType((String) data.get("type"));
        characterDetails.setGender((String) data.get("gender"));
        characterDetails.setImage((String) data.get("image"));
        characterDetails.setUrl((String) data.get("url"));
        characterDetails.setCreated((String) data.get("created"));

        Map<String, Object> originData = (Map<String, Object>) data.get("origin");
        if(originData != null) {
            Origin origin = new Origin();
            origin.setName((String) originData.get("name"));
            origin.setUrl((String) originData.get("url"));
            originService.saveOrigin(origin);
            characterDetails.setOrigin(origin);
        }

        Map<String, Object> locationData = (Map<String, Object>) data.get("location");
        if (locationData != null) {
            Location location = new Location();
            location.setName((String) locationData.get("name"));
            location.setUrl((String) locationData.get("url"));
            locationService.saveLocation(location);
            characterDetails.setLocation(location);
        }

        List<String> episodeUrls = (List<String>) data.get("episode");
        if(episodeUrls != null && !episodeUrls.isEmpty()) {
            List<Episode> episodes = episodeUrls.stream()
                    .map(episodeUrl -> {
                        Episode episode = episodeService.findByUrl(episodeUrl);
                        if (episode == null) {
                            episode = fetchEpisodeDetails(episodeUrl);
                            if (episode != null) {
                                episodeService.saveEpisode(episode);
                            } else {
                                episode = new Episode();
                                episode.setUrl(episodeUrl);
                                episodeService.saveEpisode(episode);
                            }
                        }
                        return episode;
                    }).collect(Collectors.toList());
            characterDetails.setEpisodes(episodes);
        }
        return characterDetails;
    }

    private Episode fetchEpisodeDetails(String episodeUrl) {
        try {
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    episodeUrl,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map<String, Object> episodeData = response.getBody();

                Episode episode = new Episode();
                episode.setId(((Number) episodeData.get("id")).longValue());
                episode.setName((String) episodeData.get("name"));
                episode.setAirDate((String) episodeData.get("air_date"));
                episode.setEpisode((String) episodeData.get("episode"));
                episode.setUrl((String) episodeData.get("url"));
                episode.setCreated((String) episodeData.get("created"));

                // Set the character URLs
                @SuppressWarnings("unchecked")
                List<String> characters = (List<String>) episodeData.get("characters");
                if (characters != null) {
                    episode.setCharacters(characters);
                }

                System.out.println("Fetched episode: " + episode.getName() + ", air date: " + episode.getAirDate() + ", episode: " + episode.getEpisode());

                return episode;
            }
        } catch (Exception e) {
            System.err.println("Error fetching episode from " + episodeUrl + ": " + e.getMessage());
        }

        return null;
    }

}
