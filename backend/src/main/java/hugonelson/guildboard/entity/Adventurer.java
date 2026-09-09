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
    private Integer level; 
    private Integer gold;
    private Integer xp; 

    // Empty constructor that only exists for the sake of JPA 
    public Adventurer() {}; 

    // Actual constructor to create persistent objects in database 
    public Adventurer(String name, CharacterClass characterClass, Integer level, Integer gold, Integer xp) {
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
    public Integer getLevel() {
        return level;
    }
    public Integer getGold() {
        return gold;
    }
    public Integer getXp() {
        return xp;
    }

    // mutators
    public void setName(String name) {
        this.name = name;
    }
    public void setCharacterClass(CharacterClass characterClass) {
        this.characterClass = characterClass;
    }
    public void setGold(Integer newGold) { 
        this.gold = newGold; 
    }
    public void setXp(Integer newXp) { 
        this.xp = newXp; 
    }
    public void setLevel(Integer newLevel) { 
        this.level = newLevel; 
    }
}
