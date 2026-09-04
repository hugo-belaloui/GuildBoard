package hugonelson.guildboard.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import hugonelson.guildboard.entity.Difficulty;

public record QuestRequestDTO(

        @NotBlank(message = "Title Required")
        @Size(min = 5, max = 30, message = "Title must be between 5 to 30 characters")
            String title,

        @NotBlank(message = "Description required")
        @Size(min = 10, max = 500, message = "Description must be between 10 to 500 characetrs")
            String description,

        @NotNull(message = "Difficulty required")
            Difficulty difficulty,
        

        @Min(value = 1, message = "Min lvl required is 1")
            Integer requiredLevel,

        @Min(value = 0, message = "Rewarded gold can't be negative")
            Integer goldReward,

        @Min(value = 0, message = "Rewarded xp can't be negative")
            Integer xpReward
) {
}