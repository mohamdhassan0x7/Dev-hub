import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Extend PrismaClient to support the beforeExit event
declare module '@prisma/client' {
  interface PrismaClient {
    $on(eventType: 'beforeExit', callback: () => void): void;
  }
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', () => {
      app.close().catch((err) => {
        console.error('Error during app shutdown:', err);
      });
    });
  }
}
