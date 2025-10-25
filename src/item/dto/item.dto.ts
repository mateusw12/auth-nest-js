import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ example: 'Notebook Dell', description: 'Descrição do item' })
  descricao: string;
}
