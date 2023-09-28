import { Module } from '@nestjs/common';
import 'dotenv/config';

import { PrismaModule } from './prisma/prisma.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [PrismaModule, TodoModule],
})
export class AppModule {}
