import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from "../constant.js";


export const GenerateAccessToken = (payload) =>{
    const token = jwt.sign(payload, ACCESS_TOKEN_SECRET);
    return token;
};

export const VerifyAccessToken = (accessToken) =>{
    const token = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    return token;
};