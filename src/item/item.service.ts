import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/item.dto';

@Injectable()
export class ItemService {
  private items: Record<number, Item> = {};
  private idCounter = 1;

  create(dto: CreateItemDto): Item {
    const newItem: Item = {
      id: this.idCounter++,
      descricao: dto.descricao,
    };
    this.items[newItem.id] = newItem;
    return newItem;
  }

  findAll(): Item[] {
    return Object.values(this.items);
  }

  findOne(id: number): Item {
    const item = this.items[id];
    if (!item) throw new NotFoundException(`Item ${id} não encontrado`);
    return item;
  }

  update(id: number, dto: CreateItemDto): Item {
    const item = this.findOne(id);
    item.descricao = dto.descricao;
    this.items[id] = item;
    return item;
  }

  remove(id: number): void {
    const item = this.findOne(id);
    delete this.items[item.id];
  }
}