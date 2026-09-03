package hugonelson.guildboard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hugonelson.guildboard.entity.Adventurer;

/* Arguments are the type of the JPA, and the type of its primary key 
The type Long is a wrapper object of long, so capital L */ 
public interface AdventurerRepository extends JpaRepository<Adventurer, Long> {

/* Spring auto-generates base methods : 
save(), findById(), findAll(), deleteById()... 
I can then add my own : */ 
List<Adventurer> findByName(String name);

}
