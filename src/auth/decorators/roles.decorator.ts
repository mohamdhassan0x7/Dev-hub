import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

/**
 * Metadata key used by AuthRolesGuard to read allowed roles.
 */
export const ROLES_KEY = 'roles';

/**
 * Role arguments accepted by the @Roles() decorator.
 * - UserRole: 'ADMIN' | 'USER' (from Prisma enum)
 * - 'SELF': special token meaning "current user may act on own resource"
 */
export type RoleArg = UserRole | 'SELF';

/**
 * Attach allowed roles to a resolver/route handler.
 *
 * Examples:
 *   @Roles('ADMIN')                // admin only
 *   @Roles('SELF')                 // only the resource owner
 *   @Roles('ADMIN', 'SELF')        // admin OR owner
 */
export const Roles = (...roles: RoleArg[]) => SetMetadata(ROLES_KEY, roles);
