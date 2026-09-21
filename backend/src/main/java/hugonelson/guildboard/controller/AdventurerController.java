package hugonelson.guildboard.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import hugonelson.guildboard.dto.AdventurerRequestDTO;
import hugonelson.guildboard.dto.AdventurerResponseDTO;
import hugonelson.guildboard.dto.AssignmentResponseDTO;
import hugonelson.guildboard.service.AdventurerService;
import hugonelson.guildboard.service.AssignmentService;

@RestController
@RequestMapping("/api/adventurers")
public class AdventurerController {

    private final AdventurerService adventurerService;
    private final AssignmentService assignmentService;

    public AdventurerController(AdventurerService adventurerService, AssignmentService assignmentService) {
        this.adventurerService = adventurerService;
        this.assignmentService = assignmentService;
    }

    @GetMapping
    public List<AdventurerResponseDTO> getAllAdventurers() {
        return adventurerService.getAllAdventurers();
    }

    @GetMapping("/{id}")
    public AdventurerResponseDTO getAdventurerById(@PathVariable Long id) {
        return adventurerService.getAdventurerById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AdventurerResponseDTO createAdventurer(@Valid @RequestBody AdventurerRequestDTO request) {
        return adventurerService.createAdventurer(request);
    }

    @PutMapping("/{id}")
    public AdventurerResponseDTO updateAdventurer(@PathVariable Long id, @Valid @RequestBody AdventurerRequestDTO request) {
        return adventurerService.updateAdventurer(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAdventurer(@PathVariable Long id) {
        adventurerService.deleteAdventurer(id);
    }

    @GetMapping("/{id}/history")
    public List<AssignmentResponseDTO> getAdventurerHistory(@PathVariable Long id) {
        return assignmentService.getAdventurerHistory(id);
    }
}
