package chat.config;

import org.springframework.http.HttpStatus;

public class RestException extends RuntimeException {

    private final HttpStatus httpStatus;
    private final String errorMessage;

    public RestException(HttpStatus httpStatus, String errorMessage) {
        this.httpStatus = httpStatus;
        this.errorMessage = errorMessage;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}