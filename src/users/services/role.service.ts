import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../entities/role.entity';
import { In, Repository } from 'typeorm';
import { CreateRoleDTO } from '../dtos/create-role.dto';
import { ErrorManager } from 'src/config/handlers/error.handler';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  public async createRole(createRoleDto: CreateRoleDTO): Promise<RoleEntity> {
    try {
      const roleCreate = this.roleRepository.create(createRoleDto);
      return await this.roleRepository.save(roleCreate);
    } catch (error) {
      throw ErrorManager.handlerExceptions(error);
    }
  }

  public async findOneRole(roleQuery: string): Promise<RoleEntity> {
    try {
      const role = await this.roleRepository.findOneBy({
        name: roleQuery,
      });

      if (!role) throw new NotFoundException('Role not found');

      return role;
    } catch (error) {
      throw ErrorManager.handlerExceptions(error);
    }
  }

  public async findRoleByIds(rolesID: string[]): Promise<RoleEntity[]> {
    try {
      const roles = await this.roleRepository.find({
        where: {
          rol_id: In(rolesID),
        },
      });

      if (roles.length != rolesID.length) {
        throw new BadRequestException('One or more roles do not exist');
      }

      return roles;
    } catch (error) {
      throw ErrorManager.handlerExceptions(error);
    }
  }

  public async getAll(): Promise<RoleEntity[]> {
    try {
      return await this.roleRepository.find();
    } catch (error) {
      throw ErrorManager.handlerExceptions(error);
    }
  }
}
