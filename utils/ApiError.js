class ApiError extends Error {
    constructor(statusCode, message){
        this.statusCode = statusCode;
        this.message = message;
        
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    };
};

export default ApiError;