package com.example.rickandmortynewsfeed.service;

import com.example.rickandmortynewsfeed.entity.CharacterDetails;
import com.example.rickandmortynewsfeed.repository.CharacterRepository;
import com.example.rickandmortynewsfeed.repository.EpisodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@Service
public class CharacterService {

    private final CharacterRepository characterRepository;

    @Autowired
    public CharacterService(CharacterRepository characterRepository) {
        this.characterRepository = characterRepository;
    }

    public List<CharacterDetails> getAllCharacters() {
        return characterRepository.findAll();
    }
    
    public Page<CharacterDetails> getCharactersPage(Pageable pageable) {
        return characterRepository.findAll(pageable);
    }
    
    public Page<CharacterDetails> getFilteredCharactersPage(String name, String status, String species, Pageable pageable) {
        boolean hasName = StringUtils.hasText(name);
        boolean hasStatus = StringUtils.hasText(status);
        boolean hasSpecies = StringUtils.hasText(species);
        
        if (hasName && hasStatus && hasSpecies) {
            return characterRepository.findByNameContainingIgnoreCaseAndStatusAndSpecies(name, status, species, pageable);
        } else if (hasName && hasStatus) {
            return characterRepository.findByNameContainingIgnoreCaseAndStatus(name, status, pageable);
        } else if (hasName && hasSpecies) {
            return characterRepository.findByNameContainingIgnoreCaseAndSpecies(name, species, pageable);
        } else if (hasStatus && hasSpecies) {
            return characterRepository.findByStatusAndSpecies(status, species, pageable);
        } else if (hasName) {
            return characterRepository.findByNameContainingIgnoreCase(name, pageable);
        } else if (hasStatus) {
            return characterRepository.findByStatus(status, pageable);
        } else if (hasSpecies) {
            return characterRepository.findBySpecies(species, pageable);
        } else {
            return characterRepository.findAll(pageable);
        }
    }

    public CharacterDetails getCharacterById(long id) {
        return characterRepository.findById(id).orElse(null);
    }

    @Transactional
    public CharacterDetails saveCharacter(CharacterDetails characterDetails) {
        return characterRepository.save(characterDetails);
    }

}
