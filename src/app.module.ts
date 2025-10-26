import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { ApiKeyModule } from './api-key/api-key.module';
import { BasicAuthModule } from './basic-auth/basic-auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60, // tempo de vida da janela (60 segundos)
        limit: 10, // número máximo de requisições permitidas
      },
    ]),
    ItemModule,
    UserModule,
    BasicAuthModule,
    ApiKeyModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // aplica globalmente o guard
    },
  ],
})
export class AppModule {}
