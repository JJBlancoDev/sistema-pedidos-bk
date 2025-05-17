import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  full_name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  identification: string;

  @IsString()
  @MinLength(8)
  @MaxLength(12)
  password: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  roles: string[];
}
