import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  LoginUserDto,
  LoginUserResponseDto,
  RegisterUserDto,
} from './auth.dto';

// auth.resolver.ts
@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => String)
  async signup(
    @Args('data') RegisterUserDto: RegisterUserDto,
  ): Promise<string> {
    const token = await this.auth.signup(RegisterUserDto);
    return token.access_token;
  }

  @Mutation(() => LoginUserResponseDto)
  async login(
    @Args('data') LoginUserDto: LoginUserDto,
  ): Promise<LoginUserResponseDto> {
    const user = await this.auth.login(LoginUserDto);
    if (!user) throw new Error('Invalid credentials');
    return user;
  }
}
