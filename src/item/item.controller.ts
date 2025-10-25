import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateItemDto } from './dto/item.dto';
import { Auth, Public, UserAccess } from 'src/auth/decorator';
import { ItemService } from './item.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Item")
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Public()
  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.findOne(id);
  }

  @Post()
  @Auth() // já aplica guard + Swagger
  create(@Body() dto: CreateItemDto, @UserAccess() user: any) {
    console.log('Usuário logado:', user);
    return this.itemService.create(dto);
  }

  @Put(':id')
  @Auth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateItemDto,
    @UserAccess() user: any,
  ) {
    console.log('Usuário logado:', user);
    return this.itemService.update(id, dto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseIntPipe) id: number, @UserAccess() user: any) {
    console.log('Usuário logado:', user);
    this.itemService.remove(id);
    return { message: `Item ${id} removido com sucesso.` };
  }
}
