import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginUserDTO } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDTO) {
    return await this.authService.sigIn(
      loginUserDto.email,
      loginUserDto.password,
    );
  }
}
