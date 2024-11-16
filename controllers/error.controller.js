import { NODE_ENV } from "../constant.js";
import ApiError from "../utils/ApiError.js";

const DevError = (res, err) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stackTrace: err.stack,
        err,
    });
};

const ProdError = (res, err) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message
        });
    } else {
        res.status(500).json({
            status: "failed",
            message: "Something went wrong! Please try agin later"
        });
    }
};

export default (error, req, res, next) => {
    error.status = error.status || 'error';
    error.statusCode = error.statusCode || 500;

    if (NODE_ENV === "development") {
        DevError(res, error);
    } else if (NODE_ENV === "production") {
        ProdError(res, error);
    }

}