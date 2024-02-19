import { IsNotEmpty, IsString } from "class-validator";


export class CreateActyvEntityRequestDto{

    @IsString()
    name: string;

    @IsString()
    key : string;

    @IsNotEmpty()
    theme:string;
}