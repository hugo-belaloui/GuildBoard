package hugonelson.guildboard.service;

import org.springframework.stereotype.Service;

import hugonelson.guildboard.repository.AdventurerRepository;
import hugonelson.guildboard.repository.AssignmentRepository;
import hugonelson.guildboard.repository.QuestRepository;
import hugonelson.guildboard.entity.Assignment;

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

    // assigns an adventurer to a quest, applies RG1 and RG2
    public Assignment assign(Long questId, Long adventurerId) {
        // load the quest with questRepository, the adventurer with adventurerRepository

        // RG1 - reject if adventurer.getLevel() < quest.getRequiredLevel()

        return null;
    }
}
