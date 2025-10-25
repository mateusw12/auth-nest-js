import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ApiKeyDto {
  @ApiProperty()
  @IsString()
  username: string;
}
