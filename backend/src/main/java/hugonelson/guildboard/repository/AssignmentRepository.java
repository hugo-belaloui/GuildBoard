package hugonelson.guildboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hugonelson.guildboard.entity.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    
}

