import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { ErrorManager } from 'src/config/handlers/error.handler';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { RoleService } from './role.service';
import { ROLE } from 'src/const/role.enum';
import { RoleEntity } from '../entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly roleService: RoleService,
  ) {}

  public async create(createUserDto: CreateUserDTO): Promise<UserEntity> {
    const { password, roles: rolesId } = createUserDto;
    try {
      let rolesEntity: RoleEntity[] = [];

      if (rolesId) {
        rolesEntity = await this.roleService.findRoleByIds(rolesId);
      } else {
        rolesEntity = await this.userWithRoleBasic();
      }

      const passwordHashed = await bcrypt.hash(
        password,
        Number(this.configService.getOrThrow<number>('SALT_ROUNDS')),
      );

      const userCreate = this.usersRepository.create({
        ...createUserDto,
        password: passwordHashed,
        roles: rolesEntity,
      });

      const userSaved = await this.usersRepository.save(userCreate);
      return userSaved;
    } catch (error) {
      throw ErrorManager.handlerExceptions(error);
    }
  }

  private async userWithRoleBasic(): Promise<RoleEntity[]> {
    try {
      const role = await this.roleService.findOneRole(ROLE.BASIC);
      return [role];
    } catch (error) {
      throw ErrorManager.handlerExceptions(error);
    }
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.usersRepository
        .createQueryBuilder('customer')
        .where({ email })
        .leftJoinAndSelect('customer.roles', 'roles')
        .getOne();

      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (error) {
      throw ErrorManager.handlerExceptions(error);
    }
  }

  public async findAll(): Promise<UserEntity[]> {
    try {
      const user = await this.usersRepository
        .createQueryBuilder('customer')
        .leftJoinAndSelect('customer.roles', 'roles')
        .getMany();

      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (error) {
      throw ErrorManager.handlerExceptions(error);
    }
  }
}
