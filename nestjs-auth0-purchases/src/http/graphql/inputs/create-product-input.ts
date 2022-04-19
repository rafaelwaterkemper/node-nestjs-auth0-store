import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  title: string;
}
