import { IsEmpty, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { createRequestDto } from "./create-request-dto";
import { Category } from "../Schema/book.schema";
import { User } from "src/auth/Schema/user-schema";


export class UpdateRequestDto {
    @IsOptional()
    @IsString()
    readonly title:string;

    @IsOptional()
    @IsString()
    readonly author:string;

    @IsOptional()
    @IsString()
    readonly description:string;

    @IsOptional()
    @IsNumber()
    readonly price:string;

    @IsOptional()
    @IsEnum(Category,{message:"Please choose the right category"})  
    readonly category:string

    @IsEmpty({message : 'You cannot pass user Id'})
    readonly user:User
}