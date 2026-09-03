package hugonelson.guildboard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hugonelson.guildboard.entity.Adventurer;

/* Arguments are the type of the JPA, and the type of its primary key 
The type Long is a wrapper object of long, so capital L */ 
@Repository
public interface AdventurerRepository extends JpaRepository<Adventurer, Long> {

/* Spring auto-generates base methods : 
save(), findById(), findAll(), deleteById()... 

GET /api/adventurers  findAll()                                                                         
GET /api/adventurers/{id}  findById(id)                                                                 
POST /api/adventurers  save(adventurer)                                                                 
PUT /api/adventurers/{id}  findById(id) then save(adventurer)                                           
DELETE /api/adventurers/{id}  deleteById(id)    

I can then add my own : */ 
List<Adventurer> findByName(String name);

}
