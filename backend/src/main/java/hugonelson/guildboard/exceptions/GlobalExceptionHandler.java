package hugonelson.guildboard.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// RestControllerAdvice : catches all exceptions raised in ANY controller of the app 
@RestControllerAdvice
public class GlobalExceptionHandler {

    // RG1/RG2/404 : the exception already carries the right status, code and message
    
    // Method activates when the specific exception is raised 
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiErrorResponse> handleApiException(ApiException ex) {
        ApiErrorResponse body = new ApiErrorResponse(ex.getStatus().value(), ex.getCode(), ex.getMessage());
        return ResponseEntity.status(ex.getStatus()).body(body);
    }

    // Bean Validation failures on @Valid @RequestBody DTOs
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationException(MethodArgumentNotValidException ex) {
        // Only return the first error found in the form
        FieldError firstError = ex.getBindingResult().getFieldErrors().get(0);
        ApiErrorResponse body = new ApiErrorResponse(HttpStatus.BAD_REQUEST.value(), "VALIDATION_ERROR", firstError.getDefaultMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    // safety net : anything unexpected becomes a clean 500, no stack trace ever reaches the client
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleUnexpected(Exception ex) {
        ApiErrorResponse body = new ApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "INTERNAL_ERROR", "Something went wrong.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}
