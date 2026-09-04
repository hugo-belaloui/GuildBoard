package hugonelson.guildboard.dto;

import java.time.LocalDateTime;

public record AssignmentResponseDTO(
        Long id,
        Long adventurerId,
        Long questId,      
        LocalDateTime assignedAt,
        LocalDateTime completedAt
) {
}