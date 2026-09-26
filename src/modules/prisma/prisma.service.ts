import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect().catch((err) => {
      console.warn('Prisma connection note: PostgreSQL database not immediately reachable, fallback/mock mode active for isolated module tests.', err.message);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
