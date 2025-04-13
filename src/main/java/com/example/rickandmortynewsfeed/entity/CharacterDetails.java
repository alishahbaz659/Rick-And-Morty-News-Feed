package com.example.rickandmortynewsfeed.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "characters")
@Data
@NoArgsConstructor
public class CharacterDetails {

    @Id
    private long id;

    private String name;
    private String status;
    private String species;
    private String type;
    private String gender;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "origin_id")
    private Origin origin;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "location_id")
    private Location location;

    private String image;

    @ManyToMany
    @JoinTable(
            name = "character_episode",
            joinColumns = @JoinColumn(name = "character_id"),
            inverseJoinColumns = @JoinColumn(name = "episode_id")
    )
    private List<Episode> episodes;

    private String url;
    private String created;

}
