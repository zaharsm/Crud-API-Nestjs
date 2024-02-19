import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/Schema/user-schema";

export  enum Category { 
    ADVENTURE = 'adventure',
    FANTASY = 'fantasy',
    CLASSICS = 'classics',
    CRIME = 'crime'
};

@Schema({
    timestamps:true
})

export class Book{
    @Prop()
    title:string;

    @Prop()
    author:string;

    @Prop()
    description:string

    @Prop()
    price:string

    @Prop()
    category: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user : User
}

export const BookSchema = SchemaFactory.createForClass(Book);