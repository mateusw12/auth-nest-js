import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { ApiKeyModule } from './api-key/api-key.module';
import { BasicAuthModule } from './basic-auth/basic-auth.module';

@Module({
  imports: [ItemModule, UserModule, BasicAuthModule, ApiKeyModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
