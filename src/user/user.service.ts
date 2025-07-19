import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './user.dto';
import { USER_SELECT_FIELDS } from './user.constants';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers() {
    return this.prismaService.user.findMany({
      select: USER_SELECT_FIELDS,
    });
  }

  async getUserById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: USER_SELECT_FIELDS,
    });
  }

  // async createUser(createUserDto: CreateUserDto) {
  //   return this.prismaService.user.create({
  //     data: createUserDto,
  //     select: USER_SELECT_FIELDS,
  //   });
  // }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
      select: USER_SELECT_FIELDS,
    });
  }

  async deleteUser(id: string) {
    return this.prismaService.user.delete({
      where: { id },
      select: USER_SELECT_FIELDS,
    });
  }

  async getUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
      select: USER_SELECT_FIELDS,
    });
  }
}
