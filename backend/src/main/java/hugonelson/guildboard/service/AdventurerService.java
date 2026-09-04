package hugonelson.guildboard.service;

import java.util.ArrayList; //
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import hugonelson.guildboard.dto.AdventurerRequestDTO;
import hugonelson.guildboard.dto.AdventurerResponseDTO;
import hugonelson.guildboard.exceptions.ApiException;
import hugonelson.guildboard.repository.AdventurerRepository;

import hugonelson.guildboard.entity.Adventurer;
import hugonelson.guildboard.entity.CharacterClass;


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

        for(Adventurer Adventurer : adventurers) //loop for each entity found in the list 
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
    // public AdventurerResponseDTO getAdventurerById (Long id)
    // {

    // }    
    
}
