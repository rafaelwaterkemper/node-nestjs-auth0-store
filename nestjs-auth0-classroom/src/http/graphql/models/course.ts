import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Course {
  @Field(() => ID)
  id: string;

  @Field()
  titel: string;

  @Field()
  slug: string;
}
