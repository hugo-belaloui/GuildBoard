package hugonelson.guildboard.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Quest {
    public enum Difficulty {
        EASY,
        MEDIUM,
        HARD,
        EPIC
    }
    public enum QuestStatus {
        AVAILABLE,
        ON_GOING,
        COMPLETED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    public Difficulty difficulty;

    private Integer requiredLevel;
    private Integer goldReward;
    private Integer xpReward;

    @Enumerated(EnumType.STRING)
    public QuestStatus status;

    public Quest() {};

    public Quest(String title, String description, Difficulty difficulty, Integer requiredLevel, Integer goldReward, Integer xpReward, QuestStatus status)
    {
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.requiredLevel = requiredLevel;
        this.goldReward = goldReward;
        this.xpReward = xpReward;
        this.status = status;
    }

    // accessors
    public long getId() {
        return id;
    }
    public String getTitle() {
        return title;
    }
    public String getDescription() {
        return description;
    }
    public Difficulty getDifficulty() {
        return difficulty;
    }
    public Integer getRequiredLevel() {
        return requiredLevel;
    }
    public Integer getGoldReward() {
        return goldReward;
    }
    public Integer getXpReward() {
        return xpReward;
    }
    public QuestStatus getStatus() {
        return status; 
    }

    // mutators
    public void setTitle(String title) {
        this.title = title;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }
    public void setRequiredLevel(Integer requiredLevel) {
        this.requiredLevel = requiredLevel;
    }
    public void setGoldReward(Integer goldReward) {
        this.goldReward = goldReward;
    }
    public void setXpReward(Integer xpReward) {
        this.xpReward = xpReward;
    }
    public void setStatus(QuestStatus newStatus) { 
        this.status = newStatus; 
    }
}
