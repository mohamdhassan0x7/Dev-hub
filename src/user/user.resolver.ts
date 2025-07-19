import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.types';
import { UpdateUserDto } from './user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthRolesGuard } from '@guards/roles.guard';
import { Roles } from '@decorators/roles.decorator';
import { CurrentUser } from '@decorators/current-user.decorator';
import { UserPayloadToken } from 'src/auth/auth.types';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Query(() => User)
  async user(
    @Args('id', { type: () => String }) id: string,
  ): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  @Query(() => User)
  async userByEmail(@Args('email') email: string): Promise<User | null> {
    return this.userService.getUserByEmail(email);
  }

  @UseGuards(AuthRolesGuard)
  @Roles('SELF')
  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('input') updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: UserPayloadToken,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(AuthRolesGuard)
  @Roles('SELF')
  @Mutation(() => User)
  async deleteUser(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() currentUser: UserPayloadToken,
  ): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
