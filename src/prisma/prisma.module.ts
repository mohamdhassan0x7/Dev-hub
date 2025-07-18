import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global()
@Module({
  providers: [PrismaService], //use classes that has logic i need to use
  exports: [PrismaService], //export: are providers that i want to use in other modules
  // imports: [], //imports: modules that i need to use its exported classes
  // controllers: [], //controllers: classes that handle incoming requests and return responses
})
export class PrismaModule {}
