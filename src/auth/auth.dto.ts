import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';
import { User } from 'src/user/user.types';

@InputType()
export class RegisterUserDto {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;

  @Field(() => String)
  firstName!: string;

  @Field(() => String)
  lastName!: string;

  @Field(() => Date, { nullable: true })
  dateOfBirth?: Date;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;
}

@InputType()
export class LoginUserDto {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}

@InputType()
export class GenTokenDto {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  role!: UserRole;
}

@ObjectType()
export class LoginUserResponseDto {
  @Field(() => String)
  accessToken!: string;

  @Field(() => User)
  user!: User;
}
