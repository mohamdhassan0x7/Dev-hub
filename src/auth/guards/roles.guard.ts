/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from '@decorators/roles.decorator';
import { UserPayloadToken } from '../auth.types';

@Injectable()
export class AuthRolesGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }
  getRequest(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    return gqlCtx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. First validate JWT (AuthGuard 'jwt' does this)
    // This one uses the Passport strategy to validate the JWT token and add user to request
    try {
      const valid = await super.canActivate(context);
      if (!valid) return false;

      // 2. Extract user from context
      const gqlCtx = GqlExecutionContext.create(context);
      const req = gqlCtx.getContext().req;
      const user: UserPayloadToken = req.user;
      if (!user) return false;

      // 3. Check roles/ownership
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) return true; // only needs valid token

      if (requiredRoles.includes('ADMIN') && user.role === 'ADMIN') return true;

      if (requiredRoles.includes('SELF')) {
        const args = gqlCtx.getArgs();
        const targetId =
          args.id ?? args.userId ?? args.input?.id ?? args.where?.id;
        return targetId && user.id === targetId;
      }

      return false;
    } catch (error) {
      console.error('Error in AuthRolesGuard:', error);
      return false;
    }
  }
}
