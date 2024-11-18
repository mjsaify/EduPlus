import ApiResponse from "../utils/ApiResponse.js";
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from "../utils/asyncHandler.js"
import { AuthSchema } from "../utils/_types.js";
import UserModel from '../models/user.model.js';
import { GenerateAccessToken } from "../utils/index.js";
import { COOKIE_OPTION } from "../constant.js";

export const UserSignup = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // check for empty fields
    if ([email, password].some((field) => field.trim() === "")) {
        const error = new ApiError(400, "All fields are required");
        return next(error);
    }

    // validate inputs
    const parseInputs = AuthSchema.safeParse(req.body);
    if (!parseInputs.success) {
        const error = new ApiError(400, parseInputs.error.errors[0].message);
        return next(error);
    };

    // check if user exist already
    const ExistedUser = await UserModel.findOne({ email: parseInputs.data.email });
    if (ExistedUser) {
        const error = new ApiError(400, "Email already exist.");
        return next(error);
    };

    // save user
    const user = await UserModel.create({
        email: parseInputs.data.email,
        password: parseInputs.data.password,
    });
    return res.status(200).json(new ApiResponse(201, "", "Registration Successfull"));
});

export const UserLogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // check for empty fields
    if ([email, password].some((field) => field.trim() === "")) {
        const error = new ApiError(400, "All fields are required");
        return next(error);
    };

    // validate inputs
    const parseInputs = AuthSchema.safeParse(req.body);
    if (!parseInputs.success) {
        const error = new ApiError(400, parseInputs.error.errors[0].message);
        return next(error);
    };

    // find user
    const user = await UserModel.findOne({ email: parseInputs.data.email });

    if (!user) {
        const error = new ApiError(404, "Invalid Credentials");
        return next(error);
    };

    // check password
    const isPasswordCorrect = await user.VerifyPassword(parseInputs.data.password);
    if (!isPasswordCorrect) {
        const error = new ApiError(404, "Invalid Credentials");
        return next(error);
    };

    // generate token
    const accessToken = GenerateAccessToken({ id: user._id, email: user.email });
    const loggedInUser = await UserModel.findById(user._id).select("-password -updatedAt -__v");

    // send token
    return res
        .status(200)
        .cookie("accessToken", accessToken, COOKIE_OPTION)
        .json(new ApiResponse(200, { loggedInUser }, "Welcomback User"));
});

export const UpdateUser = asyncHandler(async (req, res, next) => {
    return res
        .status(200)
        .json(new ApiResponse(200, { user: "user" }, "Your Information is Updated"));
});