import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"

export const UserSignup = asyncHandler(async (req, res, next) => {
    return res.status(200).json(new ApiResponse(201, "user", "Registration Successfull"));
});

export const UserLogin = asyncHandler(async (req, res, next) => {
    return res.status(200).json(new ApiResponse(200, "user", "Welcomeback User"));
});