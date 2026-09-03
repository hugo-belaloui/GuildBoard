package hugonelson.guildboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hugonelson.guildboard.entity.Quest;

public interface QuestRepository extends JpaRepository<Quest, Long> {
    
}
