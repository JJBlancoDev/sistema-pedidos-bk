import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDTO) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  public async findUserByEmail(@Body() body: { email: string }) {
    return await this.userService.findByEmail(body.email);
  }

  @Get('all')
  public async findAll() {
    return await this.userService.findAll();
  }
}
