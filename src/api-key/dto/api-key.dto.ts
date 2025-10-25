import { IsString } from 'class-validator';

export class ApiKeyDto {
  @IsString()
  username: string;
}
