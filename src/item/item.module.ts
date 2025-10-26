import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { AuthModule } from 'src/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from 'src/common/interceptors/cache.interceptor';

@Module({
  imports: [AuthModule],
  controllers: [ItemController],
  providers: [
    ItemService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor, // aplica a todas as rotas do módulo
    },
  ],
  exports: [ItemService],
})
export class ItemModule {}
