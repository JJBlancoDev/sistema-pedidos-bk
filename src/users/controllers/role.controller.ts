import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDTO } from '../dto/create-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  public async createRole(@Body() createRoleDto: CreateRoleDTO) {
    return await this.roleService.createRole(createRoleDto);
  }

  @Get()
  public async getAll() {
    return await this.roleService.getAll();
  }
}
