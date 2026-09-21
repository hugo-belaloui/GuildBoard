package hugonelson.guildboard.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import hugonelson.guildboard.dto.QuestRequestDTO;
import hugonelson.guildboard.dto.QuestResponseDTO;
import hugonelson.guildboard.entity.Quest;
import hugonelson.guildboard.exceptions.ApiException;
import hugonelson.guildboard.repository.QuestRepository;




@Service
public class QuestService {

    private final QuestRepository questRepository; //absolutly requires repos can't make change to it

    public QuestService(QuestRepository questRepository) //constructor where spring inject the repo
    {
        this.questRepository = questRepository;
    }

    //methode to retrieve all quests
    public List<QuestResponseDTO> getAllQuests(Quest.QuestStatus status, Quest.Difficulty difficulty) //optional parameters for quest filters 
    {
        List<Quest> quests;
        if (status != null && difficulty != null)
        {
            quests = questRepository.findByStatusAndDifficulty(status, difficulty); // find quest by status and difficulty 
        }
        else if (status != null) 
        { 
            quests = questRepository.findByStatus(status);
        }
        else if (difficulty != null)
        {
            quests = questRepository.findByDifficulty(difficulty); // find quest by status and difficulty 
        }
        else
        {
        quests = questRepository.findAll(); //findAll quests from DB and save them in "quests"
        }
        List<QuestResponseDTO> dtos = new ArrayList<>(); //init an empty list
        
        for (Quest quest : quests) 
            //for each quest we parse and setup our DTO
            {
            QuestResponseDTO dto = new QuestResponseDTO(
                quest.getId(),
                quest.getTitle(),
                quest.getDescription(),
                quest.getDifficulty().name(),
                quest.getRequiredLevel(),
                quest.getGoldReward(),
                quest.getXpReward(),
                quest.getStatus().name()
            );
            dtos.add(dto);
        }
        
        return dtos;
    }

    //method to find quest by ID
    public QuestResponseDTO getQuestById(Long id) 
    {
        Optional<Quest> maybeQuest = questRepository.findById(id);//look through DB for a quest by going through the repository, optional as it might be non existant
        
        if (maybeQuest.isEmpty()) {
            throw new ApiException(HttpStatus.NOT_FOUND, "NOT_FOUND", "Quête introuvable");
        }
        
        Quest quest = maybeQuest.get();
        
        //create DTO containing quest
        return new QuestResponseDTO(
            quest.getId(),
            quest.getTitle(),
            quest.getDescription(),
            quest.getDifficulty().name(),
            quest.getRequiredLevel(),
            quest.getGoldReward(),
            quest.getXpReward(),
            quest.getStatus().name()
        );
    }


     //method to create quest
    public QuestResponseDTO createQuest(QuestRequestDTO request) {
        Quest quest = new Quest();
        
        quest.setTitle(request.title());
        quest.setDescription(request.description());
        quest.setDifficulty(request.difficulty()); 
        quest.setRequiredLevel(request.requiredLevel());
        quest.setGoldReward(request.goldReward());
        quest.setXpReward(request.xpReward());
        
        quest.setStatus(Quest.QuestStatus.AVAILABLE);

        Quest savedQuest = questRepository.save(quest);

        return new QuestResponseDTO(
            savedQuest.getId(),
            savedQuest.getTitle(),
            savedQuest.getDescription(),
            savedQuest.getDifficulty().name(),
            savedQuest.getRequiredLevel(),
            savedQuest.getGoldReward(),
            savedQuest.getXpReward(),
            savedQuest.getStatus().name()
        );
    }

    public QuestResponseDTO updateQuest(Long id, QuestRequestDTO request) {
        Optional<Quest> maybeQuest = questRepository.findById(id);
        
        if (maybeQuest.isEmpty()) {
            throw new ApiException(HttpStatus.NOT_FOUND, "NOT_FOUND", "Quête introuvable");
        }
        
        Quest quest = maybeQuest.get();

        if (quest.getStatus() == Quest.QuestStatus.ON_GOING || quest.getStatus() == Quest.QuestStatus.COMPLETED) {
            throw new ApiException(HttpStatus.UNPROCESSABLE_ENTITY, "UPDATE_FORBIDDEN", "Impossible de modifier une quête en cours ou terminée.");
        }

        quest.setTitle(request.title());
        quest.setDescription(request.description());
        quest.setDifficulty(request.difficulty());
        quest.setRequiredLevel(request.requiredLevel());
        quest.setGoldReward(request.goldReward());
        quest.setXpReward(request.xpReward());

        Quest updatedQuest = questRepository.save(quest);

        return new QuestResponseDTO(
            updatedQuest.getId(),
            updatedQuest.getTitle(),
            updatedQuest.getDescription(),
            updatedQuest.getDifficulty().name(),
            updatedQuest.getRequiredLevel(),
            updatedQuest.getGoldReward(),
            updatedQuest.getXpReward(),
            updatedQuest.getStatus().name()
        );
    }

    public void deleteQuest(Long id) {
        Optional<Quest> maybeQuest = questRepository.findById(id);
        
        if (maybeQuest.isEmpty()) {
            throw new ApiException(HttpStatus.NOT_FOUND, "NOT_FOUND", "Quête introuvable");
        }
        
        Quest quest = maybeQuest.get();

        if (quest.getStatus() == Quest.QuestStatus.ON_GOING) {
            throw new ApiException(HttpStatus.UNPROCESSABLE_ENTITY, "DELETE_FORBIDDEN", "Impossible de supprimer une quête en cours.");
        }
        
        questRepository.deleteById(id);
    }
}