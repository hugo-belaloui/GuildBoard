package hugonelson.guildboard.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // annotation saying it's a JPA entity 
public class Assignment {

    @Id // indicates a primary key 
    @GeneratedValue(strategy=GenerationType.AUTO) // auto-increment 
    private long id; 

    // foreign keys
    private int adventurer;
    private int quest; 

    private LocalDateTime assignedAt;
    private LocalDateTime completedAt; 

    // Empty constructor that only exists for the sake of JPA 
    protected Assignment() {}; 

    // Actual constructor to create persistent objects in database 
    public Assignment(int adventurer, int quest, LocalDateTime assignedAt) {
        this.adventurer = adventurer; 
        this.quest = quest; 
        this.assignedAt = assignedAt; 
        this.completedAt = null; 
    }

}
