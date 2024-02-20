// create-subrole.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}
