package com.example.rickandmortynewsfeed;

import com.example.rickandmortynewsfeed.service.RickAndMortyApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RickAndMortyNewsfeedApplication {

	private final RickAndMortyApiService rickAndMortyApiService;

	@Autowired
	public RickAndMortyNewsfeedApplication(RickAndMortyApiService rickAndMortyApiService) {
		this.rickAndMortyApiService = rickAndMortyApiService;
	}

	public static void main(String[] args) {
		SpringApplication.run(RickAndMortyNewsfeedApplication.class, args);
	}

	@Bean
	public CommandLineRunner run() throws Exception {
		return args -> {
			System.out.println("CommandLineRunner is starting...");
			rickAndMortyApiService.fetchAndSaveCharacters(1);
			System.out.println("CommandLineRunner has finished.");
		};
	}
}
