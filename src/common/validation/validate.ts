import {validate, ValidationError} from "class-validator";
import e = require("express");
import {AppError} from "../error/AppError";


export async  function  ValidateBody <T extends object> (cls: new() => T,body:unknown):Promise<T> {

    const instance:T = Object.assign(new cls(), body) // dto = {email,name,password} body{name,password,email,phone} instance{email,name,password}
    const errors  = await validate(instance,{whitelist:true})

    if(errors.length > 0) {
        const messages = errors.flatMap((e):string[] =>Object.values(e.constraints ?? {}))
        throw  new AppError(messages.join(', \n '),400)
    }
    return instance

}