import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dto/item.dto';

@ApiTags('Items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  // 🟢 GET sem autenticação
  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  // 🟢 GET by ID sem autenticação
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.findOne(id);
  }

  // 🔒 POST com autenticação
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateItemDto) {
    return this.itemService.create(dto);
  }

  // 🔒 PUT com autenticação
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateItemDto) {
    return this.itemService.update(id, dto);
  }

  // 🔒 DELETE com autenticação
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.itemService.remove(id);
    return { message: `Item ${id} removido com sucesso.` };
  }
}
