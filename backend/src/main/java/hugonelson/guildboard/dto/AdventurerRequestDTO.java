package hugonelson.guildboard.dto;

//Bean validation imports to protect our API (is asked for)
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

//validate enum 
import hugonelson.guildboard.entity.CharacterClass;

//Java class to represent data includes getters and such
public record AdventurerRequestDTO(
    //Bean validaiton annotation
    @NotBlank(message = "Require Name")
    @Size(min = 3, max = 25, message = "Name must contains between 3 to 25 characters")
        String name,

    @NotNull(message = "Character class required")
        CharacterClass CharacterClass,

    @Min(value = 0, message = "XP can't be negative")
        Integer xp,

    @Min(value = 0, message = "gold can't be negative")
        Integer gold


) {
}