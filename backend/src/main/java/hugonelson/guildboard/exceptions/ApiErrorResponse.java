package hugonelson.guildboard.exceptions;

public record ApiErrorResponse(int status, String code, String message) {}
