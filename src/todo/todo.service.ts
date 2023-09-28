import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaError } from '../utils/prisma-error';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTodos() {
    return this.prismaService.todos.findMany();
  }

  async getTodoById(id: number) {
    const todo = await this.prismaService.todos.findUnique({
      where: {
        id,
      },
    });
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  async createPost(todo: CreateTodoDto) {
    return this.prismaService.todos.create({
      data: todo,
    });
  }

  async updatePost(id: number, todo: UpdateTodoDto) {
    try {
      return await this.prismaService.todos.update({
        data: {
          ...todo,
          id: undefined,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new NotFoundException();
      }
      throw error;
    }
  }

  async deletePost(id: number) {
    try {
      return this.prismaService.todos.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new NotFoundException();
      }
      throw error;
    }
  }
}
