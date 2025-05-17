import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ROLE } from 'src/const/role.enum';

export class CreateRoleDTO {
  @IsString()
  @IsEnum(ROLE)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
