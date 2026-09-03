package hugonelson.guildboard.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity // annotation saying it's a JPA entity 
public class Assignment {

    @Id // indicates a primary key 
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment 
    private long id; 

    // foreign keys
    @ManyToOne // many assignments per adventurer (history)
    @JoinColumn(name = "adventurer_id") // foreign key in the table 
    private Adventurer adventurer;

    @OneToOne // one assignment per quest 
    @JoinColumn(name = "quest_id", unique = true) // enforces the 1/1 cardinality in SQL 
    private Quest quest;

    private LocalDateTime assignedAt;
    private LocalDateTime completedAt; 

    // Empty constructor that only exists for the sake of JPA 
    protected Assignment() {}; 

    // Actual constructor to create persistent objects in database 
    public Assignment(Adventurer adventurer, Quest quest, LocalDateTime assignedAt) {
        this.adventurer = adventurer; 
        this.quest = quest; 
        this.assignedAt = assignedAt; 
        this.completedAt = null; 
    }

    // accessors
    public long getId() {
        return id;
    }
    public Adventurer getAdventurer() {
        return adventurer;
    }
    public Quest getQuest() {
        return quest;
    }
    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }
    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    // turn completion time from null to appropriate timestamp 
    public void complete(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
}
