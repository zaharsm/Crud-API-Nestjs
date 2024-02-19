import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";


export class SignUpDto{
    @IsNotEmpty()
    @IsString()
    name : string;


    @IsNotEmpty()
    @IsEmail()
    email : string;


    @IsNotEmpty()
    @IsStrongPassword()
    @MinLength(6)
    password : string;
}