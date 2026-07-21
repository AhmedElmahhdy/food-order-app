import {
    IS_STRONG_PASSWORD,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsStrongPassword,
    MaxLength,
    min,
    MinLength
} from "class-validator";
import {SystemRole} from "../../user/enum";

export class RegisterDTO {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    // @IsStrongPassword({
    //     //minLength:8,
    //     // minUppercase:1,
    //     // minSymbols:1,
    //     // minNumbers:1,
    //
    // })
    password!: string;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(11)
    phone!: string;

    @IsEnum(SystemRole)
    role!: SystemRole;
}

