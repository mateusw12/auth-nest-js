import { Module } from '@nestjs/common';
import { BasicAuthController } from './basic-auth.controller';
import { BasicAuthService } from './basic-auth.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [BasicAuthController],
  providers: [BasicAuthService],
})
export class BasicAuthModule {}
