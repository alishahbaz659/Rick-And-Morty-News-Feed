package com.example.rickandmortynewsfeed.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Episode {

    @Id
    private Long id;

    private String name;
    private String airDate;
    private String episode;
    private String url;
    private String created;
    
    @ElementCollection
    @CollectionTable(name = "episode_character_urls", joinColumns = @JoinColumn(name = "episode_id"))
    @Column(name = "character_url", length = 512)
    private List<String> characters;

    @JsonIgnore
    @ManyToMany(mappedBy = "episodes")
    private List<CharacterDetails> characterDetails;
}
