import { IsEmail, IsNotEmpty, IsStrongPassword, MinLength } from "class-validator";

export class LoginDto{
    @IsNotEmpty()
    @IsEmail()
    email : string;


    @IsNotEmpty()
    @IsStrongPassword()
    @MinLength(6)
    password : string;

}

