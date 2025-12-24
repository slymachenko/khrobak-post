import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class EditUserDto {
  @IsPhoneNumber()
  phone: string;

  @IsString()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
