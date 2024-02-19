import { Prop, Schema } from "@nestjs/mongoose";
import { ISignUpSlider } from "src/Theme/theme.interface";

@Schema({_id:false})
export class Theme{
    @Prop()
    logo :string;

    @Prop()
    signupSlider :ISignUpSlider[];

}

 