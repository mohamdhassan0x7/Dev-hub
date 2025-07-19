import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GenTokenDto } from '../auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // "Authorization: Bearer <token>"
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'dev_secret_change_me',
    });
  }

  validate(payload: GenTokenDto) {
    // attaches to req.user (or GQL context user)
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
