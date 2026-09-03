package hugonelson.guildboard.exceptions;

// a Spring class representing an Http status as a constant, rather than a "magical floating number"
import org.springframework.http.HttpStatus;

// a java class of unchecked exceptions that can be thrown, 
// and also has a built-in .getMessage() function
public class ApiException extends RuntimeException {

    private final HttpStatus status;
    private final String code;

    public ApiException(HttpStatus status, String code, String message) {
        super(message);
        this.status = status;
        this.code = code;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }
}
