import ApiError from '../utils/ApiError.js';
import { VerifyAccessToken } from '../utils/index.js';
import UserModel from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const UserAuth = asyncHandler(async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        const error = new ApiError(401, "Invalid request")
        return next(error);
    };

    const decodedToken = VerifyAccessToken(token);
    const user = await UserModel.findById(decodedToken.id);
    if (!user) {
        const error = new ApiError(404, "User Not Found");
        return next(error);
    };

    req.user = user;
    next();

});

export const AdminAuth = (req, res, next) => {
    next();
}