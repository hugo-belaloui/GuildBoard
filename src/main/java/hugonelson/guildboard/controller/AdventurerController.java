package hugonelson.guildboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hugonelson.guildboard.repository.AdventurerRepository;
import hugonelson.guildboard.entity.Adventurer;

@RestController
@RequestMapping("/api/adventurers")
public class AdventurerController {
    
    @Autowired 
    private AdventurerRepository adventurerRepository; 
    
    // GET /api/adventurers : fetch all adventurers
    @GetMapping
    public List<Adventurer> getAllTasks() {
        return adventurerRepository.findAll();
    }

}
