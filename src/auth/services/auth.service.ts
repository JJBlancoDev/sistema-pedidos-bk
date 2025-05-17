import { BadRequestException, Injectable } from '@nestjs/common';
import { ErrorManager } from 'src/config/handlers/error.handler';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { RoleEntity } from 'src/users/entities/role.entity';
import { PayloadJwt } from '../interfaces/PayloadJwt.interface';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async sigIn(
    email: string,
    password: string,
  ): Promise<{ acces_token: string }> {
    try {
      const user = await this.userService.findByEmail(email);
      const passwordCompared = await bcrypt.compare(password, user.password);

      if (email === user.email && passwordCompared) {
        const acces_token = this.generateJwtToken(user);
        return acces_token;
      } else {
        throw new BadRequestException('Incorrect email or password');
      }
    } catch (error) {
      throw ErrorManager.handlerExceptions(error);
    }
  }

  async generateJwtToken(user: UserEntity) {
    const payload: PayloadJwt = {
      sub: user.customer_id,
      roles: this.generatePayload(user.roles),
    };
    const acces_token = await this.jwtService.signAsync(payload);
    return { acces_token };
  }

  private generatePayload(roles: RoleEntity[]): string[] {
    return roles.map((role: RoleEntity) => role.name);
  }
}
