import jwt, {SignOptions} from "jsonwebtoken";
import {env} from "../../common/config/env";




export interface JwtPayload {
    userID: Number;
    email: String;
    role: String;
}
export  function  createAccessToken(payload: JwtPayload): string {
    const options:SignOptions = {expiresIn:Number(env.jwt.accessExpiersIn)}
    return jwt.sign(payload,env.jwt.accessSecret, options)
}


export  function  createRefreshToken(payload: JwtPayload): string {
    const options:SignOptions = {expiresIn:Number(env.jwt.refreshExpiresIN)}
    return jwt.sign(payload,env.jwt.refreshSecret, options)
}