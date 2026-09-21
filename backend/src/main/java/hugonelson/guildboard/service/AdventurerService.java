package hugonelson.guildboard.service;

import java.util.ArrayList; //empty arrays
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import hugonelson.guildboard.dto.AdventurerRequestDTO;
import hugonelson.guildboard.dto.AdventurerResponseDTO;
import hugonelson.guildboard.exceptions.ApiException;
import hugonelson.guildboard.repository.AdventurerRepository;

import hugonelson.guildboard.entity.Adventurer;
import hugonelson.guildboard.entity.Adventurer.CharacterClass;


@Service
public class AdventurerService {
    private final AdventurerRepository adventurerRepository; // Absolutely requires repos can't make changes to it 
    public AdventurerService(AdventurerRepository adventurerRepository) // constructor 
    {
        this.adventurerRepository = adventurerRepository;
    }


    //Method to retrieve every adventurer
    public List<AdventurerResponseDTO> getAllAdventurers() //method that return a list of dtos 
    {
        List<Adventurer> adventurers = adventurerRepository.findAll(); //repo look for every adventurer in postgre
        List<AdventurerResponseDTO> dtos = new ArrayList<>(); // list that contains every dto from above

        for(Adventurer adventurer : adventurers) //loop for each entity found in the list 
        {
            AdventurerResponseDTO dto = new AdventurerResponseDTO // create a new dto (response) filled with the entity's data
            ( adventurer.getId(),
            adventurer.getName(),
            adventurer.getCharacterClass().name(),
            adventurer.getLevel(),
            adventurer.getXp(),
            adventurer.getGold()
            );
            dtos.add(dto);
        }
        return dtos;
    }

    //method to retrieve an adventurer by id
    public AdventurerResponseDTO getAdventurerById (Long id)
    {
        Optional<Adventurer> maybeAdventurer = adventurerRepository.findById(id); //look through DB for an adventurer by going through the repository, optional as it might be non existant
        
        if (maybeAdventurer.isEmpty()) {
            throw new ApiException(HttpStatus.NOT_FOUND, "NOT_FOUND", "Aventurier introuvable"); //exception if not not found
        }
        
        Adventurer adventurer = maybeAdventurer.get(); //we retrieve the adventurer and save it
        
        return new AdventurerResponseDTO(
            adventurer.getId(),
            adventurer.getName(),
            adventurer.getCharacterClass().name(),
            adventurer.getLevel(),
            adventurer.getXp(),
            adventurer.getGold()
        ); // create a DTO
    }    

    //method to create an adventurer 
    public AdventurerResponseDTO createAdventurer(AdventurerRequestDTO request) 
    //request object created containing adventurer's data {name, lvl, etc}
    {
        Adventurer adventurer = new Adventurer();
        
        adventurer.setName(request.name());
        adventurer.setCharacterClass(request.characterClass());
        
        if (request.level() != null) {
            adventurer.setLevel(request.level());
        } else {
            adventurer.setLevel(1);
        } 

        if (request.xp() != null) {
            adventurer.setXp(request.xp());
        } else {
            adventurer.setXp(0);
        }

        if (request.gold() != null) {
            adventurer.setGold(request.gold());
        } else {
            adventurer.setGold(0);
        }

        Adventurer savedAdventurer = adventurerRepository.save(adventurer) ; //save our newly created adventurer

        return new AdventurerResponseDTO(
            savedAdventurer.getId(),
            savedAdventurer.getName(),
            savedAdventurer.getCharacterClass().name(),
            savedAdventurer.getLevel(),
            savedAdventurer.getXp(),
            savedAdventurer.getGold()
        );
    }

    // method to update adventurer (put)
    public AdventurerResponseDTO updateAdventurer(Long id, AdventurerRequestDTO request) {
        Optional<Adventurer> maybeAdventurer = adventurerRepository.findById(id);
        
        if (maybeAdventurer.isEmpty()) {
            throw new ApiException(HttpStatus.NOT_FOUND, "NOT_FOUND", "Aventurier introuvable");
        }
        
        Adventurer adventurer = maybeAdventurer.get();

        adventurer.setName(request.name());
        adventurer.setCharacterClass(request.characterClass());
        
        if (request.level() != null) {
            adventurer.setLevel(request.level());
        }

        if (request.xp() != null) {
            adventurer.setXp(request.xp());
        }

        if (request.gold() != null) {
            adventurer.setGold(request.gold());
        }

        Adventurer updatedAdventurer = adventurerRepository.save(adventurer);

        return new AdventurerResponseDTO(
            updatedAdventurer.getId(),
            updatedAdventurer.getName(),
            updatedAdventurer.getCharacterClass().name(),
            updatedAdventurer.getLevel(),
            updatedAdventurer.getXp(),
            updatedAdventurer.getGold()
        );
    }

    //method to delete the adventurer
    public void deleteAdventurer(Long id) 
    {
        Optional<Adventurer> maybeAdventurer = adventurerRepository.findById(id);
        
        if (maybeAdventurer.isEmpty()) {
            throw new ApiException(HttpStatus.NOT_FOUND, "NOT_FOUND", "Aventurier introuvable");
        }
        
        adventurerRepository.deleteById(id);
    }
}
