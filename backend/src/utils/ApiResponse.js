class ApiResponse {
    constructor(statusCode,  message = "Operation completed successfully", data = null) {
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.success = statusCode < 400 // returns true/false automatically
    }
}

export { ApiResponse };
