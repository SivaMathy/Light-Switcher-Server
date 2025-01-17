import { Field, ObjectType } from "@nestjs/graphql";
import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/users/entities/user.entity";

@Schema()
@ObjectType()
export class Auth {
    @Field(() => User)
    user: User;
  
    @Field(() => String)
    token: string;
    @Field(() => String)
    refreshToken: string;

  }
 export const AuthSchema =SchemaFactory.createForClass(Auth)