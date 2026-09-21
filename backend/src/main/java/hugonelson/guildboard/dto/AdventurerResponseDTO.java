package hugonelson.guildboard.dto;

public record AdventurerResponseDTO(
        Long id,
        String name,
        String characterClass,
        Integer level,
        Integer xp,
        Integer gold
) {
}