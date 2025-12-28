class ApiResponse {
    constructor(statusCode, data = null, message = "Operation completed successfully") {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode < 400; // returns true/false automatically
    }
}

export { ApiResponse };
