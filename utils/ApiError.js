class ApiError extends Error {
    constructor(statusCode, message){
        super(message) // Call to the parent constructor and sets the error message
        this.statusCode = statusCode;
        this.message = message;
        this.status = this.statusCode >= 400 && this.statusCode <= 499 ? 'fail' : 'error';
        this.isOperational = true;
        this.success = false;
        Error.captureStackTrace(this, this.constructor);
    };
};

export default ApiError;