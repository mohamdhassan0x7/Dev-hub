// Reusable Prisma select objects for User queries
export const USER_SELECT_FIELDS = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  dateOfBirth: true,
  phone: true,
  bio: true,
  avatar: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  // password is intentionally excluded for security
} as const;

// If you need to include teams relation in some queries
export const USER_SELECT_WITH_TEAMS = {
  ...USER_SELECT_FIELDS,
  teams: {
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  },
} as const;
