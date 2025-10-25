import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Nome de usuário do login',
    example: 'usuario123',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senhaSegura123',
  })
  @IsString()
  password: string;
}
