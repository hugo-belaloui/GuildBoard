package hugonelson.guildboard.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Quest {
    private enum Difficulty {
        EASY,
        MEDIUM,
        HARD,
        EPIC
    }
    private enum QuestStatus {
        AVAILABLE,
        ON_GOING,
        COMPLETED
    }

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    private int requiredLevel;
    private int goldReward;
    private int xpReward;

    @Enumerated(EnumType.STRING)
    private QuestStatus status;

    protected Quest() {};

    public Quest(String title, String description, Difficulty difficulty, int requiredLevel, int goldReward, int xpReward, QuestStatus status)
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
    public long getRequiredLevel() {
        return requiredLevel;
    }
    public long getGoldReward() {
        return goldReward;
    }
    public long getXpReward() {
        return xpReward;
    }




}
