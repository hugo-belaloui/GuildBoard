package hugonelson.guildboard.service;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import hugonelson.guildboard.repository.AdventurerRepository;
import hugonelson.guildboard.repository.AssignmentRepository;
import hugonelson.guildboard.repository.QuestRepository;
import hugonelson.guildboard.entity.Adventurer;
import hugonelson.guildboard.entity.Assignment;
import hugonelson.guildboard.entity.Quest;
import hugonelson.guildboard.exceptions.ApiException;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final AdventurerRepository adventurerRepository;
    private final QuestRepository questRepository;

    public AssignmentService(AssignmentRepository assignmentRepository, AdventurerRepository adventurerRepository, QuestRepository questRepository) {
        this.assignmentRepository = assignmentRepository;
        this.adventurerRepository = adventurerRepository;
        this.questRepository = questRepository;
    }

    // assigns an adventurer to a quest
    public Assignment assign(Long questId, Long adventurerId) {

        // throw ApiException to be caught by the @RestControllerAdvice to ensure entities exists

        // Optional : a java type that can also be null, prevent crashes
        // Check if not null with .isPresent(), if so grab it with .get()
        Optional<Adventurer> maybeAdventurer = adventurerRepository.findById(adventurerId);
        Adventurer adventurer;
        if (maybeAdventurer.isPresent()) {
            adventurer = maybeAdventurer.get();
        } 
        else {
            throw new ApiException(HttpStatus.NOT_FOUND, "ADVENTURER_NOT_FOUND", "Cannot find the adventurer.");
        }

        Optional<Quest> maybeQuest = questRepository.findById(questId);
        Quest quest;
        if (maybeQuest.isPresent()) {
            quest = maybeQuest.get();
        } 
        else {
            throw new ApiException(HttpStatus.NOT_FOUND, "QUEST_NOT_FOUND", "Cannot find the quest."); // 404 
        }

        // throw ApiException to be caught by the @RestControllerAdvice to enforce RG1 (level requirement)
        if (adventurer.getLevel() < quest.getRequiredLevel()) {
            throw new ApiException(HttpStatus.UNPROCESSABLE_ENTITY, "LEVEL_TOO_LOW", // 422 
            adventurer.getName() + " (niveau " + adventurer.getLevel() + ") ne peut pas prendre une quête de niveau " + quest.getRequiredLevel() + ".");
        }

        // TODO : keep implementing business rules, only RG1 for now
        return null;
    }
}
