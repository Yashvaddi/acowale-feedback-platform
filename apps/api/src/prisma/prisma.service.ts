import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    await this.seedAdmin();
  }

  private async seedAdmin() {
    const adminEmail = 'admin@acowale.com';
    const exists = await this.user.findUnique({ where: { email: adminEmail } });
    if (!exists) {
      const passwordHash = await bcrypt.hash('admin123', 10);
      await this.user.create({
        data: {
          email: adminEmail,
          passwordHash,
          role: 'ADMIN',
        },
      });
      console.log('Default admin seeded.');
    }
  }
}
