package hugonelson.guildboard.dto;

import jakarta.validation.constraints.NotNull;

public record AssignAdventurerRequestDTO(
        @NotNull(message = "Adventurer's ID required")
            Long adventurerId
) {
}