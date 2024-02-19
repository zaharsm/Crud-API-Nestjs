import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class BaseEntity {
    _id: Types.ObjectId;

    @Prop({default: "NA"})
    createdby : string;

    @Prop()
    createdOn : Date;

    @Prop()
    DeletedBy : string;

    @Prop()
    DeletedOn : string;
    

    @Prop()
    updatedBy : string;

    @Prop()
    updatedOn : string;


    @Prop({default: false})
    isDeleted :Boolean;
}

// export const BaseEntitySchema = SchemaFactory.createForClass(BaseEntity);