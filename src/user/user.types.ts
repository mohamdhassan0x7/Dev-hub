import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  firstName!: string;

  @Field(() => String)
  lastName!: string;

  @Field(() => Date, { nullable: true })
  dateOfBirth?: Date | null;

  @Field(() => String, { nullable: true })
  phone?: string | null;

  @Field(() => String, { nullable: true })
  bio?: string | null;

  @Field(() => String, { nullable: true })
  avatar?: string | null;

  @Field(() => String)
  role!: string;

  @Field(() => Boolean)
  isActive!: boolean;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
