package hugonelson.guildboard.dto;

public record QuestResponseDTO(
        Long id,
        String title,
        String description,
        String difficulty,
        Integer requiredLevel,
        Integer goldReward,
        Integer xpReward,
        String status
) {
}