package hugonelson.guildboard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hugonelson.guildboard.entity.Quest;
import hugonelson.guildboard.entity.Quest.QuestStatus;
import hugonelson.guildboard.entity.Quest.Difficulty;;

@Repository
public interface QuestRepository extends JpaRepository<Quest, Long> {
    /* Spring auto-generates base methods : 
save(), findById(), findAll(), deleteById()*/ 

// if user filters only by status
List<Quest> findByStatus (QuestStatus status);

//if user filters only by difficulty 
List<Quest> findByDifficulty (Difficulty difficulty);

//if user filter by both 
List<Quest> findByStatusAndDifficulty (QuestStatus status, Difficulty difficulty);

//if no filter applied FindAll() is called
}
