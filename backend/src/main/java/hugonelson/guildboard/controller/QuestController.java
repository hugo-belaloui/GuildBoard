package hugonelson.guildboard.controller; // Defines the package where this class lives

import java.util.List; // Imports the List interface used for returning multiple items

import org.springframework.http.HttpStatus; // Imports HttpStatus to explicitly set HTTP response codes (like 201 Created)
import org.springframework.web.bind.annotation.*; // Imports all standard Spring web annotations (GetMapping, PostMapping, etc.)
import jakarta.validation.Valid; // Imports the @Valid annotation to enforce validation on incoming requests

import hugonelson.guildboard.dto.QuestRequestDTO; // Imports the DTO used for incoming quest creation/update requests
import hugonelson.guildboard.dto.QuestResponseDTO; // Imports the DTO used to format outgoing quest data
import hugonelson.guildboard.dto.AssignAdventurerRequestDTO; // Imports the DTO used to receive the adventurer ID when assigning a quest
import hugonelson.guildboard.entity.Quest; // Imports the Quest entity (specifically to access its enums like QuestStatus and Difficulty)
import hugonelson.guildboard.entity.Assignment; // Imports the Assignment entity returned by the assignment route
import hugonelson.guildboard.service.QuestService; // Imports the service that contains all the business logic for quests
import hugonelson.guildboard.service.AssignmentService; // Imports the service that contains the assignment business logic
import hugonelson.guildboard.dto.AssignmentResponseDTO;

@RestController // Tells Spring that this class is a Controller and every method automatically serializes its return value to JSON
@RequestMapping("/api/quests") // Sets the base URL path for all endpoints in this controller
public class QuestController { // Defines the main class for handling quest-related HTTP requests

    private final QuestService questService; // Declares an immutable dependency for QuestService
    private final AssignmentService assignmentService; // Declares an immutable dependency for AssignmentService

    // Constructor used by Spring for Dependency Injection (injects the services automatically without needing @Autowired)
    public QuestController(QuestService questService, AssignmentService assignmentService) {
        this.questService = questService; // Assigns the injected QuestService to the class field
        this.assignmentService = assignmentService; // Assigns the injected AssignmentService to the class field
    }

    // Maps HTTP GET requests sent to /api/quests to this method
    @GetMapping 
    public List<QuestResponseDTO> getAllQuests(
            // Binds the "status" query parameter from the URL, but marks it as optional (required = false)
            @RequestParam(required = false) Quest.QuestStatus status, 
            // Binds the "difficulty" query parameter from the URL, also optional
            @RequestParam(required = false) Quest.Difficulty difficulty) { 
        // Calls the service layer to fetch the quests, passing the filters (which might be null)
        return questService.getAllQuests(status, difficulty); 
    }

    // Maps HTTP GET requests sent to /api/quests/{id} to this method, where {id} is dynamic
    @GetMapping("/{id}") 
    // Extracts the {id} from the URL path and binds it to the 'id' parameter
    public QuestResponseDTO getQuestById(@PathVariable Long id) { 
        // Delegates the task of finding the specific quest to the service layer
        return questService.getQuestById(id); 
    }

    // Maps HTTP POST requests sent to /api/quests to this method
    @PostMapping 
    // Forces the HTTP response status to be 201 (CREATED) instead of the default 200 (OK) when successful
    @ResponseStatus(HttpStatus.CREATED) 
    public QuestResponseDTO createQuest(
            // @Valid triggers Bean Validation checks, @RequestBody deserializes the JSON body into a QuestRequestDTO object
            @Valid @RequestBody QuestRequestDTO request) { 
        // Delegates the creation logic to the service and returns the newly created quest as a DTO
        return questService.createQuest(request); 
    }

    // Maps HTTP PUT requests sent to /api/quests/{id} (used for full updates)
    @PutMapping("/{id}") 
    public QuestResponseDTO updateQuest(
            // Binds the quest ID from the URL path
            @PathVariable Long id, 
            // Binds and validates the incoming JSON payload for the update
            @Valid @RequestBody QuestRequestDTO request) { 
        // Delegates the update operation to the service layer and returns the updated quest
        return questService.updateQuest(id, request); 
    }

    // Maps HTTP DELETE requests sent to /api/quests/{id}
    @DeleteMapping("/{id}") 
    // Forces the HTTP response status to be 204 (NO CONTENT) because deleting doesn't return any data
    @ResponseStatus(HttpStatus.NO_CONTENT) 
    // Takes the ID of the quest to delete from the URL
    public void deleteQuest(@PathVariable Long id) { 
        // Instructs the service layer to perform the deletion
        questService.deleteQuest(id); 
    }

    // Maps HTTP POST requests sent to /api/quests/{id}/assignment
    @PostMapping("/{id}/assignment") 
    public AssignmentResponseDTO assignQuest(
            // Takes the quest ID from the URL path
            @PathVariable Long id, 
            // Validates and extracts the adventurer ID from the JSON body
            @Valid @RequestBody AssignAdventurerRequestDTO request) { 
        // Calls the AssignmentService to link the adventurer to the quest 
        Assignment assignment = assignmentService.assign(id, request.adventurerId());

        // Transforms the JPA entity into a DTO before returning it to the client 
        return new AssignmentResponseDTO(
            assignment.getId(),
            assignment.getAdventurer().getId(),
            assignment.getQuest().getId(),
            assignment.getAssignedAt(),
            assignment.getCompletedAt()
        );
    }

    // Maps HTTP POST requests sent to /api/quests/{id}/completion
    @PostMapping("/{id}/completion") 
    @ResponseStatus(HttpStatus.NO_CONTENT)
    // Extracts the quest ID from the URL to know which quest has been completed
    public void completeQuest(@PathVariable Long id) { 
        // Calls the AssignmentService to finalize the quest, distribute rewards and compute level ups (RG3)
        assignmentService.complete(id); 
    }
}
