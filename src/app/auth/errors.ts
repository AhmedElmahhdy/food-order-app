import {AppError} from "../../common/error/AppError";


export const UserAlreadyExistsError = new AppError("User already exists with same email or phone",400);


export const UserUnautharizedError = new AppError("User unautharized to register as system admin",403);