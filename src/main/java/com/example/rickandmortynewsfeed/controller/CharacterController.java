package com.example.rickandmortynewsfeed.controller;

import com.example.rickandmortynewsfeed.dto.CharacterFeedResponse;
import com.example.rickandmortynewsfeed.entity.CharacterDetails;
import com.example.rickandmortynewsfeed.service.CharacterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/characters")
public class CharacterController {

    private final CharacterService characterService;

    @Autowired
    public CharacterController(CharacterService characterService) {
        this.characterService = characterService;
    }

    @GetMapping
    public ResponseEntity<List<CharacterDetails>> getAllCharacters() {
        List<CharacterDetails> characterDetails = characterService.getAllCharacters();
        return new ResponseEntity<>(characterDetails, HttpStatus.OK);
    }

    @GetMapping("/feed")
    public ResponseEntity<CharacterFeedResponse> getCharactersFeed(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String species,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection) {
        
        Sort.Direction direction = sortDirection.equalsIgnoreCase("desc") ? 
                Sort.Direction.DESC : Sort.Direction.ASC;
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        Page<CharacterDetails> characterPage = characterService.getFilteredCharactersPage(
                name, status, species, pageable);
        
        CharacterFeedResponse response = CharacterFeedResponse.builder()
            .characters(characterPage.getContent())
            .currentPage(characterPage.getNumber())
            .totalItems(characterPage.getTotalElements())
            .totalPages(characterPage.getTotalPages())
            .build();
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CharacterDetails> getCharacterById(@PathVariable Long id) {
        CharacterDetails characterDetails = characterService.getCharacterById(id);
        if (characterDetails != null) {
            return new ResponseEntity<>(characterDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
