import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {RolesTypes } from '../roles.enum';

@Schema()
@ObjectType()
export class User extends Document {

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Field()
  @Prop()
  role:RolesTypes;

  @Field()
  @Prop()
  token:string;
  
  @Field()
  @Prop()
  refreshToken:string;
}

export const UserSchema = SchemaFactory.createForClass(User);
