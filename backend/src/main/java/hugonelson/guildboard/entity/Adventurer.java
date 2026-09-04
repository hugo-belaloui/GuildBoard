package hugonelson.guildboard.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // annotation saying it's a JPA entity 
public class Adventurer {
    
    public enum CharacterClass { 
        WARRIOR,
        MAGE, 
        CLERIC, 
        RANGER
    }

    @Id // indicates a primary key 
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment 
    private long id;

    @Column(unique = true) 
    private String name;

    @Enumerated(EnumType.STRING)
    private CharacterClass characterClass;
    private long level; 
    private long gold;
    private long xp; 

    // Empty constructor that only exists for the sake of JPA 
    protected Adventurer() {}; 

    // Actual constructor to create persistent objects in database 
    public Adventurer(String name, CharacterClass characterClass, int level, int gold, int xp) {
        this.name = name;
        this.level = level;
        this.characterClass = characterClass; 
        this.gold = gold; 
        this.xp = xp; 
    }

    // accessors
    public long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public CharacterClass getCharacterClass() {
        return characterClass;
    }
    public long getLevel() {
        return level;
    }
    public long getGold() {
        return gold;
    }
    public long getXp() {
        return xp;
    }

    // mutators
    public void setGold(long newGold) { 
        this.gold = newGold; 
    }
    public void setXp(long newXp) { 
        this.xp = newXp; 
    }
    public void setLevel(long newLevel) { 
        this.level = newLevel; 
    }
}
