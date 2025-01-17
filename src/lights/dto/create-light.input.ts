import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLightInput {

  @Field()
  name: string;

  @Field()
  state: boolean;
}
