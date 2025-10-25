import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome de usuário único para login',
    example: 'mateus_walz',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Senha do usuário (mínimo 4 caracteres)',
    example: '1234',
    minLength: 4,
  })
  @IsString()
  @MinLength(4)
  password: string;
}
