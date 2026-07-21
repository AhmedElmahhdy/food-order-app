import {RegisterDTO} from "../dto/auth.dto";
import {User} from "../../user/user.entity";
import {createUser, findUserByEmail, findUserByEmailOrPhone} from "../../user/repository/user.repo";
import {UserAlreadyExistsError,UserUnautharizedError} from "../errors";
import {hashSync,hash} from "bcrypt";
import {SystemRole} from "../../user/enum";
import {createAccessToken, createRefreshToken} from "../utils";



export class AuthService {
    register = async (data: RegisterDTO)=>{

        // check if user try to register as a system role
        if(data.role == SystemRole.SYSTEM_ADMIN){
            throw UserUnautharizedError
        }
        // if user Exist or not
        const existing = await findUserByEmailOrPhone(data.email,data.phone);

        // if Exist throw an error
            if(existing){
                throw UserAlreadyExistsError
            }
        // hash password
        const hashPassword = await hash(data.password,10)
        // create user
        const now = new Date();
        const user =  await createUser({
            email: data.email,
            name: data.name,
            phone: data.phone,
            passwordHash:hashPassword,
            systemRole:data.role,
            createdAt:now,
            updatedAt: now,
    })

        // create access token and refresh token
        const payLoad ={
            userID:user.id,
            email:user.email,
            role:data.role
        }

        const accessToken = createAccessToken(payLoad)
        const refreshToken = createRefreshToken(payLoad)

        // return tokens and user data
        return{
            accessToken,
            refreshToken,
            user:{
                id:user.id,
                email:user.email,
                role:user.systemRole

            }
        }
    }
}


export const authService =  new AuthService();