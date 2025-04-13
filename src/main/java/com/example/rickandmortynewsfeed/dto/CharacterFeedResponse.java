package com.example.rickandmortynewsfeed.dto;

import com.example.rickandmortynewsfeed.entity.CharacterDetails;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CharacterFeedResponse {
    private List<CharacterDetails> characters;
    private int currentPage;
    private long totalItems;
    private int totalPages;
} 