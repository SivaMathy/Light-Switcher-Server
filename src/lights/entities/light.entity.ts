import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
@ObjectType()
export class Light {
    @Field()
    @Prop()
    name:string;

    @Field()
    @Prop()
    state:boolean;

    @Field()
    @Prop()
    assignees: string[];
}

export const LightsSchema = SchemaFactory.createForClass(Light)
