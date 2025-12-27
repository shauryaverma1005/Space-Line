class ApiResponse {
    constructor(
        statusCode,
        data,
        message="operation completed successfully",
    ){
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.success = statusCode < 400 ? true: false
    }
}

export {ApiResponse}