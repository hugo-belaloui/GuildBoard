package hugonelson.guildboard.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import hugonelson.guildboard.entity.Assignment;
import hugonelson.guildboard.entity.Quest;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    
    //GET /api/adventurers/{id}/history
    List<Assignment> findByAdventurerId(Long adventurerId);


    // A JPA query method to check if an adventurer already has an ON_GOING quest assigned
    boolean existsByAdventurer_IdAndQuest_Status(Long adventurerId, Quest.QuestStatus status);

    // A JPA query method to find the assignment tied to a given quest 
    Optional<Assignment> findByQuest_Id(Long questId);

}

