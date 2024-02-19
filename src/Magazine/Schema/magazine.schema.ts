import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

const enum Category{
    AUTOMOBILE='automobile',
    DRAKULA= 'drakula'
};

@Schema({
    timestamps:true
})

export class Magazine{
    @Prop()
    title:string;

    @Prop()
    content:string;

    @Prop()
    category:Category;
}

export const MagazineSchema = SchemaFactory.createForClass(Magazine);