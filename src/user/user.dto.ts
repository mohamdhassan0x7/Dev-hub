import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  //   @Field(() => String, { nullable: true })
  //   role?: string;

  @Field(() => Date, { nullable: true })
  dateOfBirth?: Date;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;
}
