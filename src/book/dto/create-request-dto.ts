import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../Schema/book.schema";
import { User } from "src/auth/Schema/user-schema";

export class createRequestDto {

     @IsNotEmpty()
     @IsString()
     title:string;

     @IsNotEmpty()
     @IsString()
     author:string;

     @IsNotEmpty()
     @IsString()
     description:string;

     @IsNotEmpty()
     @IsNumber()
     price:string;

     @IsNotEmpty()
     @IsEnum(Category,{message:"Please choose the right category"})  
     category:string;

    @IsEmpty({message : 'You cannot pass user Id'})
    readonly user:User
}