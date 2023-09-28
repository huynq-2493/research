import { Module } from '@nestjs/common';

import { TodoService } from './todo.service';
import TodosController from './todo.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TodosController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
