import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Itheme } from "src/Theme/theme.interface";
import { BaseEntity } from "src/entity/baseEntity";
import { Theme } from "src/schemas/theme.schemas";


@Schema({collection: "actyv-entity", timestamps:true}) 


export class ActyvEntity extends BaseEntity{
    constructor(self: object) {
        super();
        Object.assign(this, self);
    }

    @Prop()
    name:string;

    @Prop({unique:true})
    key:string;

    @Prop({type:Theme})
    theme: Itheme;
}

export const ActyvEntitySchema = SchemaFactory.createForClass(ActyvEntity)
