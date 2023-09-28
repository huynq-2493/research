import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FindOneParams } from '../utils/find-one-params';

@Controller('todos')
export default class TodosController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos() {
    return this.todoService.getTodos();
  }

  @Get(':id')
  getPostById(@Param() { id }: FindOneParams) {
    return this.todoService.getTodoById(Number(id));
  }

  @Post()
  async createPost(@Body() todo: CreateTodoDto) {
    return this.todoService.createPost(todo);
  }

  @Put(':id')
  async updatePost(
    @Param() { id }: FindOneParams,
    @Body() todo: UpdateTodoDto,
  ) {
    return this.todoService.updatePost(Number(id), todo);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: FindOneParams) {
    return this.todoService.deletePost(Number(id));
  }
}
