import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto, GenTokenDto, LoginUserDto } from './auth.dto';
import { User } from 'src/user/user.types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(RegisterUserDto: RegisterUserDto) {
    const hashed = await bcrypt.hash(RegisterUserDto.password, 10);
    const user = await this.prisma.user.create({
      data: { ...RegisterUserDto, password: hashed },
    });
    return this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  async login(LoginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: LoginUserDto.email },
    });
    if (!user) return null;
    const ok = await bcrypt.compare(LoginUserDto.password, user.password);
    if (!ok) return null;

    // Generate and return token instead of just user data
    const token = await this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const resUser: User = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      phone: user.phone,
      bio: user.bio,
      avatar: user.avatar,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return {
      accessToken: token.access_token,
      user: resUser,
    };
  }

  async generateToken(user: GenTokenDto): Promise<{ access_token: string }> {
    const payload = {
      id: user.id, // Changed from 'sub' to 'id' to match JWT strategy
      email: user.email,
      role: user.role,
    };
    return { access_token: await this.jwt.signAsync(payload) };
  }
}
